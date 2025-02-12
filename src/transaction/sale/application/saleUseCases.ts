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

export class SaleUseCases {
  constructor(
    private readonly saleRepository: SaleRepository,
    private readonly customerRepository: CustomerRepository,
  ) {}

  async createSale({
    customerId,
    details,
    iva,
    sellerId,
    budgetId,
  }: CreateSaleDTO) {
    const sale = Sale.new({
      customerId,
      details,
      iva,
      sellerId,
      budgetId,
    });

    return await this.saleRepository.save(sale);
  }

  async getDetails(uuid: string) {
    const sale = await this.saleRepository.findByUuid(uuid);
    const customer = await this.customerRepository.getCustomer(
      sale.getCustomerId(),
    );
    return SaleDTO(sale, customer);
  }

  async listSales() {
    const sales = await this.saleRepository.findAll();
    const customers = await this.customerRepository.getCustomers();

    return sales.map((sale) => {
      const customer = customers.find(
        (customer) => customer.getId() === sale.getCustomerId(),
      );
      return SaleDTO(sale, customer as CustomerEntity);
    });
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

  async update(uuid: string, { payment, status }: EditSaleDTO) {
    if (status) {
      return this.updateStatus(uuid, status);
    }

    if (payment) {
      return this.addPayment(uuid, payment);
    }

    throw new InvalidOperationError("No se puede actualizar la venta");
  }

  async updatePaymentStatus({
    saleID,
    paymentID,
    status,
  }: {
    saleID: string;
    paymentID: string;
    status: SalePaymentStatus;
  }) {
    const sale = await this.saleRepository.updatePayment(
      saleID,
      paymentID,
      status,
    );
  }
}
