"use client";

import { Button } from "@/components/ui/button";
import { useCart } from "./cart-context";

export function CartButton() {
  const { totalItems, setIsOpen } = useCart();

  return (
    <Button
      variant="ghost"
      onClick={() => setIsOpen(true)}
      className="px-0 hover:bg-transparent hover:underline text-base cursor-pointer"
    >
      CART {totalItems > 0 ? <span>{totalItems > 99 ? "99+" : `(${totalItems})`}</span> : "(0)"}
    </Button>
  );
}
