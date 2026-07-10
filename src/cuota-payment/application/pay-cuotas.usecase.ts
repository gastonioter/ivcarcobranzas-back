import { CuotaPayment } from "../domain/cuota-payment.entity";
import { CuotaPaymentRepository } from "../domain/cuota-payment.repository";
import { CuotaStatus } from "../../cuotaV2/domain/cuota.entity";
import { CuotaRepository } from "../../cuotaV2/domain/cuota.repository";

interface PayCuotasDTO {
  customerId: string;
  cuotaIds: string[];
}

export class PayCuotasUseCase {
  constructor(
    private readonly cuotaRepository: CuotaRepository,
    private readonly cuotaPaymentRepository: CuotaPaymentRepository,
  ) {}

  async execute(dto: PayCuotasDTO): Promise<CuotaPayment> {
    const { customerId, cuotaIds } = dto;

    const cuotas = await this.cuotaRepository.findAll({ customerId, uuids: cuotaIds });

    if (cuotas.length !== cuotaIds.length)
      throw new Error("Cuotas inexistentes.");

    const alreadyPaid = cuotas.find((c) => c.isPaid());
    if (alreadyPaid)
      throw new Error(`La cuota ${alreadyPaid.getId()} ya se encuentra paga.`);

    cuotas.forEach((c) => c.setState(CuotaStatus.PAID)); // Cuota's final state.

    const payment = CuotaPayment.new(
      customerId,
      cuotas.map((c) => ({ 
        uuid: c.id, 
        month: c.month, 
        year: c.year, 
        amount: c.amount 
      })),
    );

    // TODO: refactor this in the future to either:
    // a - use domain events to synch aggregates and avoid cross-aggregates transactions.
    // b - include cuotas-payments as part of the cuota aggregate.
    await Promise.all([
      ...cuotas.map((c) => this.cuotaRepository.save(c.getId(), c)),
      this.cuotaPaymentRepository.save(payment.getId(), payment),
    ]);

    return payment;
  }
}