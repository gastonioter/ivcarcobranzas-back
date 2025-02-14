import z from "zod";
import { createTransactionSchema } from "../../infraestructure/transaction.dto";
import { PaymentSchema } from "../../salePayment/infraestructure/InputPaymentDTO";

/* Schemas form Zod Validation at routes*/
export const CreateSaleSchema = createTransactionSchema.extend({});

export const EditSaleSchema = z.object({
  status: z.enum(["ACTIVATE", "DEACTIVATE"]).optional(),
  payment: PaymentSchema.optional(),
});

/* Types for use cases arguments */

export type EditSaleDTO = z.infer<typeof EditSaleSchema>;

export type CreateSaleDTO = z.infer<typeof CreateSaleSchema>;
