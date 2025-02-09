import z from "zod";

const createCategorySchema = z.object({
  name: z
    .string()
    .nonempty("El nombre es obligatorio") // Si quieres que no esté vacío
    .min(1, { message: "El nombre es obligatorio" }) // Si quieres que no esté vacío
    .max(255, { message: "El nombre es muy largo" }), // Si quieres limitar la longitud
  description: z.string().optional().default(""),
});

export class CreateCategoryDTO {
  name: string;
  description: string;

  constructor(data: { name: string; description: string }) {
    this.name = data.name;
    this.description = data.description;
  }

  static fromRequest(data: unknown): CreateCategoryDTO {
    const parsed = createCategorySchema.parse(data);
    return new CreateCategoryDTO(parsed);
  }
}
