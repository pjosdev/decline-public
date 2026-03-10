import { Suspense } from "react";
import { CheckoutSuccessClient } from "./success-client";
import { Container } from "@/components/layout/container";

function SuccessPageSkeleton() {
  return (
    <Container className="min-h-[70vh] flex items-center justify-center py-20">
      <div className="max-w-md w-full text-center space-y-8">
        {/* Skeleton for success icon */}
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 rounded-full bg-muted animate-pulse" />
        </div>
        
        {/* Skeleton for headline */}
        <div className="space-y-3">
          <div className="h-10 w-64 bg-muted animate-pulse mx-auto rounded" />
          <div className="py-4 space-y-2">
            <div className="h-6 w-80 bg-muted animate-pulse mx-auto rounded" />
            <div className="h-6 w-72 bg-muted animate-pulse mx-auto rounded" />
          </div>
        </div>

        {/* Skeleton for order info box */}
        <div className="bg-muted p-6 text-left space-y-4">
          <div className="h-5 w-32 bg-muted-foreground/20 animate-pulse rounded" />
          <div className="space-y-2">
            <div className="h-4 w-full bg-muted-foreground/10 animate-pulse rounded" />
            <div className="h-4 w-full bg-muted-foreground/10 animate-pulse rounded" />
            <div className="h-4 w-3/4 bg-muted-foreground/10 animate-pulse rounded" />
          </div>
        </div>

        {/* Skeleton for buttons */}
        <div className="space-y-3">
          <div className="h-10 w-full bg-muted animate-pulse rounded" />
          <div className="h-10 w-full bg-muted animate-pulse rounded" />
        </div>

        {/* Skeleton for support text */}
        <div className="h-4 w-48 bg-muted animate-pulse mx-auto rounded" />
      </div>
    </Container>
  );
}

export default function CheckoutSuccessPage() {
  return (
    <Suspense fallback={<SuccessPageSkeleton />}>
      <CheckoutSuccessClient />
    </Suspense>
  );
}
