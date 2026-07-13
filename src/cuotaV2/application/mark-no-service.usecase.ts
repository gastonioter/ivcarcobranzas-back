import { Cuota } from "../domain/cuota.entity";
import { CuotaRepository } from "../domain/cuota.repository";
import { CuotaDTO, toDTO } from "./cuota.dto";

export class MarkCuotaAsNoServiceUseCase {
  constructor(private readonly cuotaRepository: CuotaRepository) {}

  async execute(cuotaId: string): Promise<CuotaDTO> {
    const cuota = await this.cuotaRepository.findById(cuotaId);
    if (!cuota) throw new Error("Cuota no encontrada");

    cuota.markAsNoService();

    await this.cuotaRepository.save(cuota.getId(), cuota);

    return toDTO(cuota);
  }
}
