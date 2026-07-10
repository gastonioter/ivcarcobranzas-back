import { Cuota } from "../domain/cuota.entity";
import { CuotaRepository } from "../domain/cuota.repository";

export class EditCuotaUseCase {
  constructor(private readonly cuotaRepository: CuotaRepository) {}

  async execute(cuotaId: string, amount: number): Promise<Cuota> {
    const cuota = await this.cuotaRepository.findById(cuotaId);
    if (!cuota) throw new Error("Cuota no encontrada");

    if (cuota.isPaid()) throw new Error("No se puede modificar el monto de una cuota pagada");
    if (amount <= 0) throw new Error("El monto debe ser mayor a cero");

    cuota.amount = amount;

    await this.cuotaRepository.save(cuota.id, cuota);

    return cuota;
  }
}
