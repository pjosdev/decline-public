"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Typography } from "@/components/ui/typography";
import { useCart } from "./cart-context";
import { SHIPPING_COST, TAX_RATE } from "@/lib/cart-constants";
import { formatPrice } from "@/helpers/format";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export function CartSheet() {
  const {
    items,
    isOpen,
    setIsOpen,
    removeItem,
    updateQuantity,
    subtotal,
    error,
    clearError,
  } = useCart();
  const router = useRouter();

  const shipping = subtotal > 9900 ? 0 : SHIPPING_COST;
  const tax = Math.round(subtotal * TAX_RATE);
  const total = subtotal + shipping + tax;

  const handleCheckout = () => {
    setIsOpen(false);
    router.push("/checkout");
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetContent className="flex flex-col gap-0">
        <SheetHeader className="border-b pb-4">
          <SheetTitle className="flex uppercase items-center gap-2">
            Cart ({items.length})
          </SheetTitle>
        </SheetHeader>

        {error && (
          <div className="mx-4 mt-4 p-4 bg-destructive/10 border border-destructive rounded-lg">
            <Typography variant="body" className="text-destructive">
              {error.message}
            </Typography>
            <Button
              variant="ghost"
              size="sm"
              className="mt-2"
              onClick={clearError}
            >
              Dismiss
            </Button>
          </div>
        )}

        <div className="flex-1 overflow-y-auto">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-4 text-muted-foreground">
              <Typography variant="body">Your cart is empty</Typography>
              <Button
                variant="outline"
                className="text-sm!"
                onClick={() => setIsOpen(false)}
              >
                Close Cart
              </Button>
            </div>
          ) : (
            <div>
              {items.map((item) => (
                <CartItemRow
                  key={item.id}
                  item={item}
                  onUpdateQuantity={updateQuantity}
                  onRemove={removeItem}
                />
              ))}
            </div>
          )}
        </div>

        {items.length > 0 && (
          <SheetFooter className="border-t pt-4 flex-col gap-4">
            <div className="w-full space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Shipping</span>
                <span>{shipping === 0 ? "FREE" : formatPrice(shipping)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Tax (8%)</span>
                <span>{formatPrice(tax)}</span>
              </div>
              <div className="flex justify-between pt-2 border-t">
                <Typography variant="headline">Total</Typography>
                <Typography variant="headline">{formatPrice(total)}</Typography>
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

            <Button
              className="w-full text-sm!"
              size="lg"
              onClick={handleCheckout}
            >
              Proceed to Checkout
            </Button>
          </SheetFooter>
        )}
      </SheetContent>
    </Sheet>
  );
}

function CartItemRow({
  item,
  onUpdateQuantity,
  onRemove,
}: {
  item: ReturnType<typeof useCart>["items"][0];
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemove: (id: string) => void;
}) {
  return (
    <div className="flex gap-4 p-4 not-last:border-b first:border-t">
      {/* Product Image */}
      <div className="w-20 h-20 bg-card-img-bg overflow-hidden shrink-0">
        <Image
          src={item.product.cartImage?.src ?? item.product.images?.[0]?.image.src ?? "/placeholder-product.png"}
          alt={item.product.name}
          className="w-full h-full object-cover"
          width={400}
          height={400}
        />
      </div>

      {/* Product Details */}
      <div className="flex-1 min-w-0">
        <Typography className="line-clamp-1 font-medium text-base">
          {item.product.name}
        </Typography>

        <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
          <span className="uppercase">{item.size}</span>
        </div>

        <Typography variant="body" className="mt-2">
          {formatPrice(item.product.price)}
        </Typography>

        {/* Quantity Controls */}
        <div className="flex items-center gap-2 mt-3">
          <Button
            variant="outline"
            size="icon-sm"
            className="h-7 w-7"
            onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
          >
            <Minus className="w-3 h-3" />
          </Button>

          <span className="w-8 text-center text-sm">{item.quantity}</span>

          <Button
            variant="outline"
            size="icon-sm"
            className="h-7 w-7"
            onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
          >
            <Plus className="w-3 h-3" />
          </Button>

          <Button
            variant="ghost"
            size="icon-sm"
            className="h-7 w-7 ml-auto text-destructive hover:text-destructive"
            onClick={() => onRemove(item.id)}
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
