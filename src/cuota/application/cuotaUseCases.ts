import { CustomerRepository } from "../../customer/domain/interfaces/CustomerRepository";
import { CreateCuotaDTO } from "../adapters/inputCuotaDTO";
import { Cuota } from "../domain/cuota.entity";
import { CuotaRepository } from "../domain/cuota.repository";

export class CuotaUseCases {
  constructor(
    private readonly cuotaRepository: CuotaRepository,
    private readonly customerRepository: CustomerRepository,
  ) {}

  async create({ amount, customerId }: CreateCuotaDTO) {
    const cuota = Cuota.new({ amount });
    await this.cuotaRepository.save(cuota);

    const customer = await this.customerRepository.getCustomer(customerId);
    customer.addCuota(cuota);

    await this.customerRepository.saveCuota(customer.getId(), cuota);
  }
}
