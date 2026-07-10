import { Cuota } from "../domain/cuota.entity";
import { CuotaRepository } from "../domain/cuota.repository";

export class ReactivateCuotaUseCase {
  constructor(private readonly cuotaRepository: CuotaRepository) {}

  async execute(cuotaId: string): Promise<Cuota> {
    const cuota = await this.cuotaRepository.findById(cuotaId);
    if (!cuota) throw new Error("Cuota no encontrada");

    cuota.reactivate();

    await this.cuotaRepository.save(cuota.getId(), cuota);

    return cuota;
  }
}
