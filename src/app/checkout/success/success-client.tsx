"use client";

import { Container } from "@/components/layout/container";
import { Typography } from "@/components/ui/typography";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useEffect, useEffectEvent, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { loadStripe, type PaymentIntent } from "@stripe/stripe-js";
import { useCart } from "@/components/cart/cart-context";

export function CheckoutSuccessClient() {
  const [paymentInfo, setPaymentInfo] = useState<PaymentIntent | null>(null);
  const searchParams = useSearchParams();
  const router = useRouter();

  const { clearCart } = useCart();
  const handleSuccess = useEffectEvent(() => {
    clearCart();
  });

  useEffect(() => {
    const clientSecret = searchParams.get("payment_intent_client_secret");

    if (clientSecret) {
      const retrievePaymentInfo = async () => {
        const stripe = await loadStripe(
          process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!,
        );

        if (!stripe) {
          return;
        }

        const { paymentIntent } =
          await stripe.retrievePaymentIntent(clientSecret);

        if (!paymentIntent) {
          return;
        }
        
        handleSuccess();
        setPaymentInfo(paymentIntent);
      };

      retrievePaymentInfo();
    } else {
      router.push("/");
    }
  }, [searchParams, router]);

  return (
    <Container className="min-h-[70vh] flex items-center justify-center py-20">
      {paymentInfo ? (
        <PaymentSuccess paymentInfo={paymentInfo} />
      ) : (
        <div>Loading...</div>
      )}
    </Container>
  );
}

interface PaymentSuccessProps {
  paymentInfo: PaymentIntent;
}

function PaymentSuccess({ paymentInfo }: PaymentSuccessProps) {
  return (
    <div className="max-w-md w-full text-center space-y-8">
      {/* Success Message */}
      <div className="space-y-3">
        <Typography variant="headline">
          Order Confirmed
        </Typography>
        <div className="py-4">
          {paymentInfo && (
            <Typography variant="serif">
              {paymentInfo.shipping?.name}, thank you for your purchase.
            </Typography>
          )}
          <Typography variant="serif">
            We've sent a confirmation email to you.
          </Typography>
        </div>
      </div>

      {/* Order Info */}
      <div className="bg-muted p-6 text-left space-y-4">
        <Typography variant="headline">
          What's Next?
        </Typography>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li className="flex items-start gap-2">
            <span className="text-foreground">1.</span>
            <span>We'll send you an email with your order details</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-foreground">2.</span>
            <span>
              Your items will be prepared and shipped within 1-2 business days
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-foreground">3.</span>
            <span>
              You'll receive tracking information once your order ships
            </span>
          </li>
        </ul>
      </div>

      {/* Actions */}
      <div className="space-y-3">
        <Button className="w-full" size="lg" asChild>
          <Link href="/" className="flex items-center justify-center gap-2">
            Return Home
          </Link>
        </Button>
      </div>

      {/* Support */}
      <Typography variant="body" className="text-muted-foreground">
        Questions about your order?{" "}
        <Link href="/contact" className="underline hover:text-foreground">
          Contact us
        </Link>
      </Typography>
    </div>
  );
}
