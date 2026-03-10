"use client";

import NavLink from "@/components/navigation/site-nav/nav-link";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { MenuIcon, XIcon, ShoppingBag } from "lucide-react";
import { useState } from "react";
import { useCart } from "@/components/cart/cart-context";

interface MobileMenuProps {
  title: string;
  screenReaderTitle: string;
  screenReaderDescription: string;
}

export default function MobileMenu({
  title,
  screenReaderDescription,
  screenReaderTitle,
}: MobileMenuProps) {
  const [open, setOpen] = useState(false);
  const { totalItems, setIsOpen: setCartOpen } = useCart();
  return (
    <Sheet open={open} onOpenChange={() => setOpen((prev) => !prev)}>
      <SheetTrigger>
        <MenuIcon />
      </SheetTrigger>
      <SheetContent showCloseButton={false} side="right">
        {/* search here */}
        <SheetTitle className="sr-only">{screenReaderTitle}</SheetTitle>
        <SheetDescription className="sr-only">
          {screenReaderDescription}
        </SheetDescription>
        <header className="w-full px-4 nav-height border-b flex items-center justify-between">
          <p className="uppercase text-xl">{title}</p>
          <Button size={"icon-sm"} onClick={() => setOpen(false)}>
            <XIcon />
          </Button>
        </header>
        <section className="p-4">
          <ul className="flex flex-col gap-10 w-full">
            <li>
              <NavLink href={"/"} onClick={() => setOpen(false)}>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink href={"/womens"} onClick={() => setOpen(false)}>
                Womens
              </NavLink>
            </li>
            <li>
              <NavLink href={"/mens"} onClick={() => setOpen(false)}>
                Mens
              </NavLink>
            </li>
            <li>
              <NavLink href={"/news"} onClick={() => setOpen(false)}>
                News
              </NavLink>
            </li>
            <div className="border w-full h-px" />
            <li>
              <button
                onClick={() => {
                  setOpen(false);
                  setCartOpen(true);
                }}
                className="text-base text-muted-foreground flex items-center gap-2"
              >
                <ShoppingBag className="w-4 h-4" />
                Cart ({totalItems})
              </button>
            </li>
          </ul>
        </section>
      </SheetContent>
    </Sheet>
  );
}
