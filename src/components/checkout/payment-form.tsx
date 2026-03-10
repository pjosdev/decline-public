"use client";

import { useState } from "react";
import {
  PaymentElement,
  AddressElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { Button } from "@/components/ui/button";
import { Typography } from "@/components/ui/typography";
import { Loader2 } from "lucide-react";
import { formatPrice } from "@/helpers/format";

interface PaymentFormProps {
  amount: number;
}

export function PaymentForm({ amount }: PaymentFormProps) {
  const stripe = useStripe();
  const elements = useElements();

  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);
    setMessage(null);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/checkout/success`,
      },
      redirect: "always",
    });

    if (error) {
      setMessage(error.message ?? "An unexpected error occurred.");
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Shipping Address */}
      <div className="space-y-4">
        <Typography variant="headline">
          Shipping Address
        </Typography>
        <AddressElement
          options={{
            mode: "shipping",
            allowedCountries: [
              "IE",
              "GB",
              "DE",
              "FR",
              "IT",
              "ES",
              "NL",
              "BE",
              "AT",
              "CH",
              "SE",
              "NO",
              "DK",
              "FI",
              "PL",
              "CZ",
              "HU",
              "RO",
              "BG",
              "HR",
              "SI",
              "SK",
              "LT",
              "LV",
              "EE",
              "LU",
              "MT",
              "CY",
              "PT",
              "GR",
            ],
            fields: {
              phone: "always",
            },
            validation: {
              phone: {
                required: "always",
              },
            },
          }}
        />
      </div>

      {/* Payment Details */}
      <div className="space-y-4">
        <Typography variant="headline">
          Payment Details
        </Typography>
        <PaymentElement
          options={{
            layout: {
              type: "accordion",
              defaultCollapsed: false,
            },
            fields: {
              billingDetails: {
                name: "auto",
                email: "auto",
              },
            },
          }}
        />
      </div>

      {/* Error Message */}
      {message && (
        <div className="p-4 bg-destructive/10 border border-destructive rounded-lg">
          <Typography variant="body" className="text-destructive">
            {message}
          </Typography>
        </div>
      )}

      {/* Submit Button */}
      <Button
        type="submit"
        className="w-full"
        size="lg"
        disabled={!stripe || isLoading}
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Processing...
          </>
        ) : (
          <>Pay {formatPrice(amount)}</>
        )}
      </Button>

      <Typography
        variant="body"
        className="text-center text-muted-foreground"
      >
        Secure payment powered by Stripe
      </Typography>
    </form>
  );
}
