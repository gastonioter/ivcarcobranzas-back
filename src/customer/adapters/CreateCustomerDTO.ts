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
  resumenEnviado: z.boolean().default(false),
  cloudCategoryId: z
    .string()
    .uuid()
    .nonempty("La categoria de pago es requerida"),
});

export const createCustomerSchema = z.object({
  firstName: z.string().min(2),
  lastName: z.string().min(2),
  email: z.string().email(),
  cuit: z.string().optional(),
  phone: phoneSchema,
  modalidadData: z.discriminatedUnion("modalidad", [
    LocalCustomerSchema,
    CloudCustomerSchema,
  ]),
});

export const editCustomerSchema = createCustomerSchema.extend({});

export const updateCustomerStatusSchema = z.object({
  status: z.nativeEnum(CustomerStatus),
  uuid: z.string().uuid(),
});

export type CreateCustomerDTO = z.infer<typeof createCustomerSchema>;
export type EditCustomerDTO = z.infer<typeof editCustomerSchema>;
export type UpdateCustomerStatusDTO = z.infer<
  typeof updateCustomerStatusSchema
>;
