import { CustomerRepository } from "@/customerV2/domain/customer.repository";
import { Cuota } from "../domain/cuota.entity";
import { CuotaRepository } from "../domain/cuota.repository";

export class ListUseCase {
  constructor(private readonly cuotaRepository: CuotaRepository,
    private readonly customerRepsitory: CustomerRepository,
  ) {}

  async listForCustomer(customerId:string): Promise<Cuota[]> {
    const customer = await this.customerRepsitory.findById(customerId);
    if(!customer){
      throw new Error("Cliente no encontrado.");
    };

    const cuotas = await this.cuotaRepository.findAll({customerId});
    
    return cuotas;
  }
}
