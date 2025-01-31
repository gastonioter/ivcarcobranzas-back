import { z } from "zod";
import { Roles } from "./user.entity";

const emailSchema = z.string().email("El email no es válido");
const passwordSchema = z
  .string()
  .min(6, "La contraseña debe tener al menos 6 caracteres");

export const createRequestSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
  role: z.nativeEnum(Roles),
});

export const loginRequestSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});
