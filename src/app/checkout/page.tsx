import CheckoutClient from "@/app/checkout/checkout-client";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Checkout | ONI",
  description: "Complete your purchase securely with Stripe",
};

export default function CheckoutPage() {
  return <CheckoutClient />;
}
