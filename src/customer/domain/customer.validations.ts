import { z } from "zod";
import { CustomerStatus, CustomerType } from "./customer.entity";

export const CreateCustomerSchema = z.object({
  firstName: z.string().min(3).max(255),
  lastName: z.string().min(3).max(255),
  email: z.string().email().optional(),
  type: z.nativeEnum(CustomerType),
  phone: z.string().min(3).max(255),
  montoMes: z.number().optional(),
});

export const EditCustumerSchema = CreateCustomerSchema.extend({
  uuid: z.string(),
  status: z.nativeEnum(CustomerStatus),
});

export type CreateCustomerRequest = z.infer<typeof CreateCustomerSchema>;
export type EditCustomerRequest = z.infer<typeof EditCustumerSchema>;
