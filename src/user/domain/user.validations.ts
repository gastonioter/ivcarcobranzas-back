import { z } from "zod";
import { Roles } from "./user.entity";

export const createRequestSchema = z.object({
  email: z.string().email("El email no es válido"),
  password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
  role: z.nativeEnum(Roles),
});

export const loginRequestSchema = z.object({
  email: z.string().email("El email no es válido"),
  password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
  role: z.nativeEnum(Roles),
});
