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
  fullname: z.string().nonempty(),
});

export const loginRequestSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

export type RegisterRequestDTO = z.infer<typeof createRequestSchema>;
export type LoginRequestDTO = Pick<RegisterRequestDTO, "email" | "password">;
