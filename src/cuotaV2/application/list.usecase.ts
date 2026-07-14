import { CuotaFilters, CuotaRepository } from "../domain/cuota.repository";
import { CuotaDTO, toDTO } from "./cuota.dto";

export class ListUseCase {
  constructor(private readonly cuotaRepository: CuotaRepository) {}

  async listAll(filters: CuotaFilters): Promise<CuotaDTO[]> {
    const cuotas = await this.cuotaRepository.findAll(filters);

    return cuotas
      .sort((c1, c2) => {
        const a1 = c1.year;
        const m1 = c1.month;
        const a2 = c2.year;
        const m2 = c2.month;

        // Compara primero por año (descendente), luego por mes (descendente)
        if (a2 !== a1) return a2 - a1;
        return m2 - m1;
      })
      .map((c) => toDTO(c));
  }
}
