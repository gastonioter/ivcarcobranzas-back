import { CuotaRepository } from "../domain/cuota.repository";
import { CuotaDTO, toDTO } from "./cuota.dto";

export class ReactivateCuotaUseCase {
  constructor(private readonly cuotaRepository: CuotaRepository) {}

  async execute(cuotaId: string): Promise<CuotaDTO> {
    const cuota = await this.cuotaRepository.findById(cuotaId);
    if (!cuota) throw new Error("Cuota no encontrada");

    cuota.reactivate();

    await this.cuotaRepository.save(cuota.getId(), cuota);

    return toDTO(cuota);
  }
}
