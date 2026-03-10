import { NextRequest, NextResponse } from "next/server";
import stripe from "@/lib/stripe";
import { SHIPPING_COST, TAX_RATE } from "@/lib/cart-constants";
import { checkoutRequestSchema, CartItem } from "@/lib/validation";
import { WOMENS_PRODUCTS } from "@/data/womens";
import { MENS_PRODUCTS } from "@/data/mens";
import { ProductType } from "@/data/types";

const ALL_PRODUCTS: ProductType[] = [...WOMENS_PRODUCTS, ...MENS_PRODUCTS];
const PRODUCT_MAP = new Map(ALL_PRODUCTS.map((p) => [p.id, p]));

function generateErrorId(): string {
  return crypto.randomUUID();
}

function generateIdempotencyKey(): string {
  return crypto.randomUUID();
}

// Validate items against actual product data
function validateItems(items: CartItem[]): { valid: boolean; error?: string } {
  for (const item of items) {
    const product = PRODUCT_MAP.get(item.product.id);

    // Check product exists
    if (!product) {
      return {
        valid: false,
        error: `Invalid item in request: Product ${item.product.id} not found`,
      };
    }

    // Check price matches
    if (item.product.price !== product.price) {
      return {
        valid: false,
        error: `Price has changed for ${product.name}. Please refresh your cart.`,
      };
    }
  }

  return { valid: true };
}

function compressCartItems(items: Array<CartItem>): string {
  // Remove "prod_" prefix since all IDs have it
  return items
    .map(
      (item) => `${item.id.replace("prod_", "")}:${item.quantity}:${item.size}`,
    )
    .join(",");
}

export async function POST(request: NextRequest) {
  const errorId = generateErrorId();

  if (!stripe) {
    console.error(
      `[ERROR ${errorId}] Stripe not configured - STRIPE_SECRET_KEY missing`,
    );
    return NextResponse.json(
      {
        error: "Payment system unavailable. Please try again later.",
        errorId,
      },
      { status: 500 },
    );
  }

  try {
    const body = await request.json();

    const validationResult = checkoutRequestSchema.safeParse(body);

    if (!validationResult.success) {
      console.error(
        `[ERROR ${errorId}] Zod validation failed:`,
        validationResult.error.issues,
      );
      return NextResponse.json(
        {
          error: "Invalid cart data",
          details: validationResult.error.issues,
          errorId,
        },
        { status: 400 },
      );
    }

    const { items } = validationResult.data;

    const itemValidation = validateItems(items);
    if (!itemValidation.valid) {
      console.error(
        `[ERROR ${errorId}] Product validation failed: ${itemValidation.error}`,
      );
      return NextResponse.json(
        {
          error: itemValidation.error,
          errorId,
        },
        { status: 400 },
      );
    }

    const subtotal = items.reduce((sum: number, item: CartItem) => {
      const product = PRODUCT_MAP.get(item.product.id);
      if (!product) {
        throw new Error(
          `Product ${item.product.id} not found during calculation`,
        );
      }

      const price = Number(product.price);
      const quantity = Number(item.quantity);

      if (Number.isNaN(price) || Number.isNaN(quantity)) {
        console.error(
          `[ERROR ${errorId}] NaN detected: price=${product.price}, quantity=${item.quantity}, product=${item.product.id}`,
        );
        throw new Error(
          `Invalid price or quantity for product ${item.product.id}`,
        );
      }

      return sum + price * quantity;
    }, 0);

    const shipping = subtotal > 9900 ? 0 : SHIPPING_COST;
    const tax = Math.round(subtotal * TAX_RATE);
    const total = subtotal + shipping + tax;

    if (Number.isNaN(total) || total <= 0) {
      console.error(
        `[ERROR ${errorId}] Invalid total amount: ${total}, subtotal=${subtotal}, shipping=${shipping}, tax=${tax}`,
      );
      return NextResponse.json(
        {
          error: "Invalid order total. Please refresh your cart and try again.",
          errorId,
        },
        { status: 400 },
      );
    }

    const idempotencyKey = generateIdempotencyKey();
    const paymentIntent = await stripe.paymentIntents.create(
      {
        amount: total,
        currency: "eur",
        automatic_payment_methods: {
          enabled: true,
        },
        metadata: {
          error_id: errorId,
          items: JSON.stringify(compressCartItems(items)),
          subtotal: subtotal.toString(),
          shipping: shipping.toString(),
          tax: tax.toString(),
          total: total.toString(),
        },
      },
      {
        idempotencyKey,
      },
    );

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
      total,
    });
  } catch (error) {
    console.error(`[ERROR ${errorId}] Failed to create payment intent:`, error);
    return NextResponse.json(
      {
        error: "Something went wrong. Please try again.",
        errorId,
      },
      { status: 500 },
    );
  }
}
