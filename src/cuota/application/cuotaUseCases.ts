import { CustomerRepository } from "../../customer/domain/interfaces/CustomerRepository";
import { Pago } from "../../customer/domain/pago.entity";
import { CreateCuotaDTO, UpdateCuotaDTO } from "../adapters/inputCuotaDTO";
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
    facturaId,
  }: CreateCuotaDTO) {
    const customer = await this.cuotaRepository.findCustomerCuotas(customerId);

    const totalCuotas = customer.getCuotas().length;

    const cuota = Cuota.new({
      amount,
      secuence: totalCuotas,
      month,
      year,
      status,
      facturaId,
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

  async updateCuota(
    cuotaId: string,
    { serie, status, customerId, monto }: UpdateCuotaDTO,
  ) {
    const customer = await this.cuotaRepository.findCustomerCuotas(customerId);
    if (!customer) {
      throw new Error("Customer not found");
    }

    const cuotaToUpdate = customer
      .getCuotas()
      .find((c) => c.getId() === cuotaId);

    if (!cuotaToUpdate) {
      throw new Error("Cuota not found");
    }
    cuotaToUpdate.setSerie(serie);
    cuotaToUpdate.setState(status);
    cuotaToUpdate.setAmount(monto);

    await this.cuotaRepository.updateCuota(customerId, cuotaToUpdate);

    return cuotaDTO(cuotaToUpdate);
  }

  async generateCurrentMonthCuotas() {
    const customers = await this.customerRepository.getCustomers();

    customers.forEach((customer) => {
      try {
        customer.generateCuotaForCurrentMonth();
        this.cuotaRepository.update(customer);
      } catch {
        // puede que el cliente ya tenga la cuota generada
        // puede que ese cliente no sea cloud
        // ...
      }
    });

    return {
      result: "success",
    };
  }
}
