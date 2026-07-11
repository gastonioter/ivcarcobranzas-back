import { CuotaRepository } from "../domain/cuota.repository";
import { CuotaDTO, toDTO } from "./cuota.dto";

export class EditCuotaUseCase {
  constructor(private readonly cuotaRepository: CuotaRepository) {}

  async execute(cuotaId: string, amount: number): Promise<CuotaDTO> {
    const cuota = await this.cuotaRepository.findById(cuotaId);
    if (!cuota) throw new Error("Cuota no encontrada");

    if (cuota.isPaid()) throw new Error("No se puede modificar cuota pagada.");

    cuota.amount = amount;

    await this.cuotaRepository.save(cuota.id, cuota);

    return toDTO(cuota);
  }
}
