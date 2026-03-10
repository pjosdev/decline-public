import { Typography } from "@/components/ui/typography";

export function ShippingAndReturns() {
  return (
    <div>
      <Typography
        variant={"body"}
        className="text-muted-foreground mb-8"
        as="h2"
      >
        Shipping & Returns
      </Typography>
      <Typography variant={"body"} className="" as="h2">
        Enjoy FREE Standard shipping on all orders €99+. View our shipping
        policy here. We gladly accept returns on eligible items within 30 days
        of delivery. View our full return policy for details.
      </Typography>
    </div>
  );
}
