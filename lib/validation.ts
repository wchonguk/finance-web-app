import { z } from "zod"

export const transactionInputSchema = z.object({
  amount: z.number().finite(),
  description: z.string().min(1).max(255),
  categoryId: z.number().int().positive(),
  type: z.enum(["income", "expense"]),
  transactionDate: z.string().datetime(),
})

export const budgetInputSchema = z.object({
  categoryId: z.number().int().positive(),
  monthlyLimit: z.number().positive(),
  month: z.number().int().min(1).max(12),
  year: z.number().int().min(2000).max(2100),
})
