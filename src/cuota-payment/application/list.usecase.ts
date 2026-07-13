import { CuotaPayment } from "../domain/cuota-payment.entity";
import { CuotaPaymentRepository } from "../domain/cuota-payment.repository";
import { CuotaRepository } from "../../cuotaV2/domain/cuota.repository";
import { CuotaPaymentDTO, toDTO } from "./cuota-payment.dto";

interface QueryPaymentsDTO {
  customerId?: string;
}

export class ListPaymentsUseCase {
  constructor(
    private readonly cuotaPaymentRepository: CuotaPaymentRepository,
  ) {}

  async execute(dto: QueryPaymentsDTO): Promise<CuotaPaymentDTO[]> {
    const { customerId } = dto;

    const payments = await this.cuotaPaymentRepository.findAll({
      customerId,
    });

    return payments.map((payment) => toDTO(payment));
  }
}
