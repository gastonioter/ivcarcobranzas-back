import { CustomerRepository } from "../../customer/domain/interfaces/CustomerRepository";
import { CreateCuotaDTO } from "../adapters/inputCuotaDTO";
import { Cuota } from "../domain/cuota.entity";
import { CuotaRepository } from "../domain/cuota.repository";

export class CuotaUseCases {
  constructor(
    private readonly cuotaRepository: CuotaRepository,
    private readonly customerRepository: CustomerRepository,
  ) {}

  async addCuotaToCustomer({ amount, customerId }: CreateCuotaDTO) {
    const cuota = Cuota.new({ amount });
    await this.cuotaRepository.save(cuota);

    const customer = await this.customerRepository.getCustomer(customerId);
    customer.addCuota(cuota);

    await this.customerRepository.saveCuota(customer.getId(), cuota);
  }

  async getCuotas(): Promise<Cuota[]> {
    const customers = await this.customerRepository.getCustomers();

    return customers.reduce((acc, customer) => {
      const cuotas = customer.getCuotas();
      if (cuotas) {
        return [...acc, ...cuotas];
      }
      return acc;
    }, [] as Cuota[]);
  }
}
