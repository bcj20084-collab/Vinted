import { z } from "zod";
export const productSchema = z.object({
  name: z.string().trim().min(2),
  brand: z.string().trim().optional(),
  category: z.string().trim().optional(),
  size: z.string().trim().optional(),
  condition: z.enum(["NEW", "VERY_GOOD", "GOOD", "SATISFACTORY"]).optional(),
  costPrice: z.coerce.number().nonnegative(),
  purchaseDate: z.coerce.date().optional(),
  notes: z.string().optional(),
  imageUrl: z.string().url().optional().or(z.literal(""))
});
export const listingSchema = z.object({
  productId: z.string().cuid(),
  listPrice: z.coerce.number().positive(),
  listedAt: z.coerce.date().optional()
});
export const saleSchema = z.object({
  listingId: z.string().cuid(),
  salePrice: z.coerce.number().positive(),
  vintedFee: z.coerce.number().nonnegative().default(0),
  shippingCost: z.coerce.number().nonnegative().default(0),
  soldAt: z.coerce.date().optional()
});
