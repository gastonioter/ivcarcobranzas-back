import { Pago } from "../../customer/domain/pago.entity";
import { CustomerRepository } from "../../customer/domain/interfaces/CustomerRepository";
import { CreateCuotaDTO } from "../adapters/inputCuotaDTO";
import { CuotaDTO, cuotaDTO } from "../adapters/outputCuotaDTO";
import { Cuota, CuotaStatus } from "../domain/cuota.entity";
import { CuotaRepository } from "../domain/cuota.repository";

export class CuotaUseCases {
  constructor(
    private readonly cuotaRepository: CuotaRepository,
    private readonly customerRepository: CustomerRepository,
  ) {}

  async addCuotaToCustomer({
    amount,
    customerId,
    month,
    year,
    status,
  }: CreateCuotaDTO) {
    const customer = await this.cuotaRepository.findCustomerCuotas(customerId);

    const totalCuotas = customer.getCuotas().length;

    const cuota = Cuota.new({
      amount,
      secuence: totalCuotas,
      month,
      year,
      status,
    });

    customer.addCuota(cuota);

    await this.cuotaRepository.save(customer.getId(), cuota);
    return cuotaDTO(cuota);
  }

  async getCuotas(customerId: string): Promise<CuotaDTO[]> {
    const customer = await this.cuotaRepository.findCustomerCuotas(customerId);
    return customer.getCuotas().map(cuotaDTO);
  }

  async updateCuotasStatus(
    cuotasId: string[],
    customerId: string,
    status: CuotaStatus,
  ) {
    const customer = await this.customerRepository.getCustomer(customerId);

    if (status === CuotaStatus.PAID) {
      const cuotas = customer
        .getCuotas()
        .filter((c) => cuotasId.includes(c.getId()));
      const newPago = Pago.new(cuotas, customer.getPagos().length);
      customer.addPago(newPago);
    }

    
    cuotasId.forEach((cuotaId) => {
      const cuota = customer.getCuotas().find((c) => c.getId() === cuotaId);
      if (!cuota) {
        throw new Error("Cuota not found");
      }
      cuota.setState(status);
    });


    await this.cuotaRepository.update(customer);

    return customer.getCuotas().map(cuotaDTO);
  }
}
