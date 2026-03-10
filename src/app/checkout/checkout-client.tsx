"use client";

import { useCart } from "@/components/cart/cart-context";
import { PaymentForm } from "@/components/checkout/payment-form";
import { StripeProvider } from "@/components/checkout/stripe-provider";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { Typography } from "@/components/ui/typography";

import { formatPrice } from "@/helpers/format";
import { SHIPPING_COST, TAX_RATE } from "@/lib/cart-constants";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useEffectEvent, useEffect, Activity } from "react";

export default function CheckoutClient() {
  const { items, subtotal, isLoaded } = useCart();
  const router = useRouter();
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [errorId, setErrorId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"payment" | "summary">("payment");

  const shipping = subtotal > 9900 ? 0 : SHIPPING_COST;
  const tax = Math.round(subtotal * TAX_RATE);
  const total = subtotal + shipping + tax;

  // useEffectEvent creates a stable callback that always reads fresh values
  // but doesn't cause effects to re-run when those values change.
  // This prevents the infinite loop issue where adding 'isLoaded' to deps
  // would cause the PaymentIntent effect to recreate on every cart load.
  const redirectIfEmpty = useEffectEvent(() => {
    if (isLoaded && items.length === 0) {
      router.push("/");
    }
  });

  useEffect(() => {
    redirectIfEmpty();
  }, []);

  useEffect(() => {
    // Don't create PaymentIntent until cart is loaded
    if (!isLoaded) return;
    // Don't create PaymentIntent if cart is empty (redirect will handle it)
    if (items.length === 0) return;

    const abortController = new AbortController();

    fetch("/api/stripe/payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items }),
      signal: abortController.signal,
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          setError(data.error);
          setErrorId(data.errorId ?? null);
        } else {
          setClientSecret(data.clientSecret);
        }
        setIsLoading(false);
      })
      .catch((err) => {
        if (err.name === "AbortError") return; // ignore cancelled requests
        setError("Failed to initialize checkout");
        setIsLoading(false);
      });

    // if items change before checkout load, abort and wait for new response from api
    return () => abortController.abort();
  }, [items, isLoaded]);

  // Show loading state until cart is loaded from localStorage
  if (!isLoaded) {
    return (
      <Container className="min-h-[60vh] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-8 h-8 animate-spin" />
          <Typography variant="body" className="text-muted-foreground">
            Loading cart...
          </Typography>
        </div>
      </Container>
    );
  }

  // Return null while redirect happens to avoid flash of content
  if (items.length === 0) {
    return null;
  }

  if (isLoading) {
    return (
      <Container className="min-h-[60vh] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-8 h-8 animate-spin" />
          <Typography variant="body" className="text-muted-foreground">
            Initializing checkout...
          </Typography>
        </div>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="min-h-[60vh] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Typography variant="headline" className="text-destructive">
            Error
          </Typography>
          <Typography variant="body">{error}</Typography>
          {errorId && (
            <Typography
              variant="body"
              className="text-muted-foreground"
            >
              Error ID: {errorId}
            </Typography>
          )}
          <Button onClick={() => router.push("/")}>Return to Shop</Button>
        </div>
      </Container>
    );
  }

  return (
    <Container className="py-10">
      <div className="col-span-full max-w-7xl w-full mx-auto">
        <div className="flex flex-col gap-4 mb-10">
          <Typography variant="headline">
            Checkout
          </Typography>
        </div>

        {/* Mobile Layout with Activity Tabs */}
        <div className="lg:hidden">
          {/* Mobile Tab Bar */}
          <div className="flex border-b mb-6">
            <button
              onClick={() => setActiveTab("payment")}
              className={`flex-1 pb-3 text-center font-medium transition-colors border-b-2 ${
                activeTab === "payment"
                  ? "border-foreground text-foreground"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              Payment
            </button>
            <button
              onClick={() => setActiveTab("summary")}
              className={`flex-1 pb-3 text-center font-medium transition-colors border-b-2 ${
                activeTab === "summary"
                  ? "border-foreground text-foreground"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              Order Summary
            </button>
          </div>

          {/* Mobile Payment Tab */}
          <div className="min-h-125">
            <Activity mode={activeTab === "payment" ? "visible" : "hidden"}>
              {clientSecret && (
                <StripeProvider key={clientSecret} clientSecret={clientSecret}>
                  <PaymentForm amount={total} />
                </StripeProvider>
              )}
            </Activity>
            <Activity mode={activeTab === "summary" ? "visible" : "hidden"}>
              <OrderSummarySection
                items={items}
                subtotal={subtotal}
                shipping={shipping}
                tax={tax}
                total={total}
              />
            </Activity>
          </div>

          {/* Mobile Order Summary Tab */}
          <div></div>
        </div>

        {/* Desktop Layout - Side by Side */}
        <div className="hidden lg:grid lg:grid-cols-12 gap-10">
          {/* Left Column: Payment Form */}
          <div className="lg:col-span-7">
            {clientSecret && (
              <StripeProvider key={clientSecret} clientSecret={clientSecret}>
                <PaymentForm amount={total} />
              </StripeProvider>
            )}
          </div>

          {/* Right Column: Order Summary */}
          <div className="lg:col-span-5">
            <OrderSummarySection
              items={items}
              subtotal={subtotal}
              shipping={shipping}
              tax={tax}
              total={total}
            />
          </div>
        </div>
      </div>
    </Container>
  );
}

// Order Summary Component
interface OrderSummarySectionProps {
  items: Array<{
    id: string;
    quantity: number;
    size: string;
    product: {
      name: string;
      price: number;
      images?: Array<{ image: { src: string } }>;
    };
  }>;
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
}

function OrderSummarySection({
  items,
  subtotal,
  shipping,
  tax,
  total,
}: OrderSummarySectionProps) {
  return (
    <section className="sticky flex min-h-100 flex-col lg:h-160">
      <header className="bg-background justify-between pb-4 border-b shrink-0 flex items-end">
        <Typography variant="headline">
          Order Summary
        </Typography>
        <Typography variant="body">
          {items.length} items
        </Typography>
      </header>

      {/* Items */}
      <div className="flex-1 overflow-y-auto space-y-1 px-3 py-3 bg-muted-foreground/5">
        {items.map((item) => (
          <article
            key={item.id}
            className="flex bg-background gap-4 p-4 border"
          >
            <div className="size-16 bg-card-img-bg overflow-hidden shrink-0">
              <Image
                src={
                  item.product.images?.[0]?.image.src ??
                  "/placeholder-product.png"
                }
                alt={item.product.name}
                width={300}
                height={300}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <Typography variant="headline" className="line-clamp-1">
                {item.product.name}
              </Typography>
              <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
                <span className="uppercase">Size: {item.size}</span>
              </div>
              <div className="flex justify-between mt-2">
                <Typography variant="body">
                  Quantity: {item.quantity}
                </Typography>
                <Typography variant="body">
                  {formatPrice(item.product.price * item.quantity)}
                </Typography>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Totals */}
      <div className="border-t pt-4 space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Subtotal</span>
          <span>{formatPrice(subtotal)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Shipping</span>
          <span>{shipping === 0 ? "Free" : formatPrice(shipping)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Tax (8%)</span>
          <span>{formatPrice(tax)}</span>
        </div>
        <div className="flex justify-between pt-4 border-t">
          <Typography variant="headline">
            Total
          </Typography>
          <Typography variant="headline">
            {formatPrice(total)}
          </Typography>
        </div>
        {subtotal < 9900 && (
          <Typography
            variant="body"
            className="text-muted-foreground text-center"
          >
            Free shipping on orders over €99
          </Typography>
        )}
      </div>
    </section>
  );
}
