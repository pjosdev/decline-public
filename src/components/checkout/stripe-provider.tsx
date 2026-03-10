"use client";

import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { ReactNode } from "react";

// Make sure to call loadStripe outside of a component's render to avoid
// recreating the Stripe object on every render.
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!,
);

interface StripeProviderProps {
  children: ReactNode;
  clientSecret: string;
}

export function StripeProvider({
  children,
  clientSecret,
}: StripeProviderProps) {
  const appearance = {
    theme: "stripe" as const,
    variables: {
      colorPrimary: "#1a1a1a",
      colorBackground: "#ffffff",
      colorText: "#1a1a1a",
      colorTextSecondary: "#6b6b6b",
      borderRadius: "4px",
      fontFamily: "Geist, system-ui, sans-serif",
      spacingUnit: "4px",
    },
    rules: {
      ".Input": {
        border: "1px solid #d4d4d4",
        backgroundColor: "#ffffff",
        boxShadow: "none",
      },
      ".Input:focus": {
        borderColor: "#1a1a1a",
        boxShadow: "0 0 0 1px #1a1a1a",
      },
      ".Tab": {
        border: "1px solid #d4d4d4",
        borderRadius: "2px",
      },
      ".Tab--selected": {
        borderColor: "#1a1a1a",
        boxShadow: "0 0 0 1px #1a1a1a",
      },
      ".Label": {
        color: "#1a1a1a",
        fontWeight: "500",
      },
      ".StripeElement": {
        opacity: "1 !important",
        transition: "none !important",
      },
    },
  };

  const options = {
    clientSecret,
    appearance,
    fonts: [
      {
        cssSrc:
          "https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600;700&display=swap",
      },
    ],
  };

  return (
    <Elements stripe={stripePromise} options={options}>
      {children}
    </Elements>
  );
}
