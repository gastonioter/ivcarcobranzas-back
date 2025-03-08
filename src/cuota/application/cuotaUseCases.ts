import { CustomerRepository } from "../../customer/domain/interfaces/CustomerRepository";
import { CreateCuotaDTO } from "../adapters/inputCuotaDTO";
import { CuotaDTO, cuotaDTO } from "../adapters/outputCuotaDTO";
import { Cuota } from "../domain/cuota.entity";
import { CuotaRepository } from "../domain/cuota.repository";

export class CuotaUseCases {
  constructor(
    private readonly cuotaRepository: CuotaRepository,
    private readonly customerRepository: CustomerRepository,
  ) {}

  async addCuotaToCustomer({ amount, customerId }: CreateCuotaDTO) {
    const cuota = Cuota.new({ amount });

    const customer = await this.customerRepository.getCustomer(customerId);

    customer.addCuota(cuota);

    await this.cuotaRepository.save(customer.getId(), cuota);
  }

  async getCuotas(customerId: string): Promise<CuotaDTO[]> {
    const customer = await this.cuotaRepository.findCustomerCuotas(customerId);
    return customer.getCuotas().map(cuotaDTO);
  }
}
