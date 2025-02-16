import { SalePaymentRepository } from "@/transaction/salePayment/salePayment.repository";
import { CustomerEntity } from "../../../customer/domain/customer.entity";
import { CustomerRepository } from "../../../customer/domain/interfaces/CustomerRepository";
import { InvalidOperationError } from "../../../shared/domain/exceptions";
import {
  PaymentMethods,
  SalePayment,
  SalePaymentStatus,
} from "../../../transaction/salePayment/salePayment.entity";
import { SaleRepository } from "../../sale/domain/sale.repository";
import { CreateSaleDTO, EditSaleDTO } from "../adapets/inputSaleDTOs";
import SaleDTO from "../adapets/saleDTO";
import { Sale, SaleStatus } from "../domain/sale.entity";
import { UserRepository } from "../../../user/domain/user.repository";
import { SalePaymentDTO } from "../../../transaction/salePayment/adapets/salePaymentDTO";

export class SaleUseCases {
  constructor(
    private readonly saleRepository: SaleRepository,
    private readonly customerRepository: CustomerRepository,
    private readonly salePaymentRepository: SalePaymentRepository,
    private readonly userRepository: UserRepository,
  ) {}

  async createSale({
    customerId,
    details,
    iva,
    sellerId,
    budgetId,
    discount,
  }: CreateSaleDTO & { budgetId: string }) {
    const sale = Sale.new({
      customerId,
      details,
      iva,
      sellerId,
      budgetId,
      discount,
    });

    if (discount) {
      const cuponPayment = SalePayment.new({
        paymentMethod: PaymentMethods.SALDO,
        amount: discount,
        isCupon: true,
      });
      sale.addPayment(cuponPayment);
    }

    const saved = await this.saleRepository.save(sale);
    return SaleDTO(saved);
  }

  async getDetails(uuid: string) {
    const sale = await this.saleRepository.findByUuid(uuid);
    const customer = await this.customerRepository.getCustomer(
      sale.getCustomerId(),
    );
    const seller = await this.userRepository.getById(sale.getSellerId());

    return SaleDTO(sale, customer, seller);
  }

  async getPayments(uuid: string) {
    const payments = await this.salePaymentRepository.findAll(uuid);
    return payments.map(SalePaymentDTO);
  }

  async listSales() {
    const sales = await this.saleRepository.findAll();
    const customers = await this.customerRepository.getCustomers();
    const users = await this.userRepository.listUsers();

    return sales.map((sale) => {
      const customer = customers.find(
        (customer) => customer.getId() === sale.getCustomerId(),
      );
      const seller = users.find((user) => user.uuid === sale.getSellerId());

      return SaleDTO(sale, customer as CustomerEntity, seller);
    });
  }

  async update(uuid: string, { payment, status }: EditSaleDTO) {
    if (status) {
      return this.updateStatus(uuid, status);
    }
    if (payment) {
      if (payment.type === "CREATE") {
        return await this.addPayment(uuid, payment);
      }
      if (payment.type === "UPDATE") {
        return await this.updateSalePayment(uuid, payment);
      }
    }

    throw new InvalidOperationError("No se puede actualizar la venta");
  }

  private async updateStatus(uuid: string, status: string) {
    const sale = await this.saleRepository.findByUuid(uuid);
    switch (status) {
      case "ACTIVATE":
        sale.activate();
        break;
      case "DEACTIVATE":
        sale.cancel();
        break;

      default:
        throw new InvalidOperationError("Ese estado de la venta no es valido");
    }

    const updated = await this.saleRepository.update(sale);

    return SaleDTO(updated);
  }

  private async addPayment(
    uuid: string,
    payment: {
      amount: number;
      paymentMethod: PaymentMethods;
    },
  ) {
    if (!payment) {
      throw new InvalidOperationError("El pago es requerido");
    }
    const sale = await this.saleRepository.findByUuid(uuid);
    const paymentEntity = SalePayment.new({
      ...payment,
    });

    sale.addPayment(paymentEntity);

    const updated = await this.saleRepository.update(sale);

    return SaleDTO(updated);
  }

  /* BUG: Deberia solo actualizar el estado, per tambien  duplica los pagos  */
  private async updateSalePayment(
    saleID: string,
    payment: { uuid: string; status: SalePaymentStatus },
  ) {
    // acutalizo la informacion del pago
    const updated = await this.salePaymentRepository.update({
      saleID,
      paymentID: payment.uuid,
      status: payment.status,
    });

    // actualizo el estado de la venta y lo guardo
    updated.checkIfPaid();
    await this.saleRepository.update(updated);

    return SaleDTO(updated);
  }

  // private async saveSalePayments(sale:Sale){}

  // private async updateSalePayment(saleId, paymentId, status){

  // private async updateSaleStatus(saleId, status){}
}
