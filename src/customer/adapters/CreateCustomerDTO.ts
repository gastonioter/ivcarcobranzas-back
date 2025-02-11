import { z } from "zod";
import { CustomerModalidad, CustomerStatus } from "../domain/types";

const phoneSchema = z.string().regex(/^\+?\d{10,15}$/, {
  message: "Número de teléfono inválido. Debe contener entre 10 y 15 dígitos.",
});

const LocalCustomerSchema = z.object({
  modalidad: z.literal(CustomerModalidad.REGULAR),
});

const CloudCustomerSchema = z.object({
  modalidad: z.literal(CustomerModalidad.CLOUD),
  priceCategoryId: z
    .string()
    .uuid()
    .nonempty("La categoria de pago es requerida"),
});

export const createCustomerSchema = z.object({
  firstName: z.string().min(2),
  lastName: z.string().min(2),
  email: z.string().email(),
  phone: phoneSchema,
  modalidadData: z.discriminatedUnion("modalidad", [
    LocalCustomerSchema,
    CloudCustomerSchema,
  ]),
});

export const BajaCustumerSchema = z.object({
  uuid: z.string(),
  status: z.nativeEnum(CustomerStatus),
});

export type CreateCustomerDTO = z.infer<typeof createCustomerSchema>;
export type EditCustomerDTO = z.infer<typeof createCustomerSchema>;
export type BajaCustomerRequest = z.infer<typeof BajaCustumerSchema>;
