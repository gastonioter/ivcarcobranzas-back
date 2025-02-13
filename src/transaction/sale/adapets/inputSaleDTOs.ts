import z from "zod";
import { createTransactionSchema } from "../../infraestructure/transaction.dto";
import { PaymentSchema } from "../../salePayment/infraestructure/InputPaymentDTO";

export const CreateSaleSchema = createTransactionSchema.extend({
  
  budgetId: z.string().optional(),
});

export const EditSaleSchema = z.object({
  status: z.enum(["ACTIVATE", "DEACTIVATE"]).optional(),
  payment: PaymentSchema,
});

export type EditSaleDTO = z.infer<typeof EditSaleSchema>;

export type CreateSaleDTO = z.infer<typeof CreateSaleSchema>;
