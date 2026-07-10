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
    
    return cuotas.sort((c1, c2) => {
        const a1 = c1.year;
        const m1 = c1.month;
        const a2 = c2.year;
        const m2 = c2.month;

        // Compara primero por año (descendente), luego por mes (descendente)
        if (a2 !== a1) return a2 - a1;
        return m2 - m1;
      })
  }
}
