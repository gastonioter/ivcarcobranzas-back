import { z } from "zod";
import { CustomerStatus, CustomerType } from "./customer.entity";

const phoneSchema = z.string().regex(/^\+?\d{10,15}$/, {
  message: "Número de teléfono inválido. Debe contener entre 10 y 15 dígitos.",
});

export const CreateCustomerSchema = z.object({
  firstName: z.string().max(255).nonempty(),
  lastName: z.string().max(255).nonempty(),
  email: z.string().email(),
  type: z.nativeEnum(CustomerType),
  phone: phoneSchema.nonempty(),
  montoMes: z.number().nullable(),
});

export const EditCustumerSchema = CreateCustomerSchema.extend({});

export const BajaCustumerSchema = z.object({
  uuid: z.string(),
  status: z.nativeEnum(CustomerStatus),
});

export type CreateCustomerRequest = z.infer<typeof CreateCustomerSchema>;
export type EditCustomerRequest = z.infer<typeof EditCustumerSchema>;
export type BajaCustomerRequest = z.infer<typeof BajaCustumerSchema>;
