import {
  Cuota,
  CuotaMonths,
  CuotaStatus,
  mesesMap,
} from "../domain/cuota.entity";
import { CuotaRepository } from "../domain/cuota.repository";
import { CuotaDTO, toDTO } from "./cuota.dto";

interface BulkCreateCuotasDTO {
  amount: number;
  customerId: string;
  months: CuotaMonths[];
  year: number;
  status: CuotaStatus.PENDING | CuotaStatus.NO_SERVICE;
}

export class CuotaGenerationUseCases {
  constructor(private readonly cuotaRepository: CuotaRepository) {}

  async generateCuotasForCustomer(
    data: BulkCreateCuotasDTO,
  ): Promise<CuotaDTO[]> {
    const { customerId, amount, months, status, year } = data;

    const existing = await this.cuotaRepository.findAll({ customerId, year });
    const count = await this.cuotaRepository.findAll({ customerId });
    const existingMonths = new Set(existing.map((c) => c.month));

    const toCreate = months
      .filter((m) => !existingMonths.has(mesesMap[m]))
      .map((m, i) =>
        Cuota.new({
          customerId,
          amount,
          month: mesesMap[m],
          year,
          status,
          sequence: count.length + 1,
        }),
      );

    await Promise.all(toCreate.map((c) => this.cuotaRepository.save(c.id, c)));

    return toCreate.map((c) => toDTO(c));
  }
}
