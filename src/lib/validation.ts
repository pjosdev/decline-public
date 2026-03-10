import { z } from "zod";

export const cartItemSchema = z.object({
  id: z.string(),
  product: z.object({
    id: z.string(),
    name: z.string(),
    price: z.number().int().positive(),
    // pass through
    slug: z.string().optional(),
    gender: z.string().optional(),
    images: z.array(z.any()).optional(),
    cartImage: z.any().optional(),
    description: z.string().optional(),
    availableSizes: z.array(z.string()).optional(),
    reviews: z.array(z.any()).optional(),
    information: z.array(z.string()).optional(),
  }),
  size: z.string(),
  quantity: z.number().int().positive(),
});

export const checkoutRequestSchema = z.object({
  items: z.array(cartItemSchema).min(1),
});

export type CartItem = z.infer<typeof cartItemSchema>;
export type CheckoutRequest = z.infer<typeof checkoutRequestSchema>;
