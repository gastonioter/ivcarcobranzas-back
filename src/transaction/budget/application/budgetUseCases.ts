import { Sale } from "../../../transaction/sale/domain/sale.entity";
import { CustomerEntity } from "../../../customer/domain/customer.entity";
import { CustomerRepository } from "../../../customer/domain/interfaces/CustomerRepository";
import { CreateBudgetDTO } from "../adapters/inputBudgetDTOs";
import { BudgetDTO } from "../adapters/outputBudgetDTO";
import { Budget, BudgetStatus } from "../domain/budget.entity";
import { BudgetRepository } from "../domain/budget.repository";
import { SaleRepository } from "../../sale/domain/sale.repository";

export class BudgetUseCases {
  constructor(
    private readonly budgetRepository: BudgetRepository,
    private readonly customerRepository: CustomerRepository,
    private readonly saleRepository: SaleRepository,
  ) {}

  async createBudget({
    customerId,
    details,
    iva,
    expiresAt,
    sellerId,
  }: CreateBudgetDTO) {
    const budgetEntity = Budget.new({
      customerId,
      details,
      iva,
      expiresAt,
      sellerId,
    });

    const saved = await this.budgetRepository.create(budgetEntity);
    return BudgetDTO(saved);
  }

  async getDetails(uuid: string) {
    const budget = await this.budgetRepository.findByUuid(uuid);
    return BudgetDTO(budget);
  }

  async listBudgets() {
    const budgets = await this.budgetRepository.findAll();
    const customers = await this.customerRepository.getCustomers();

    return budgets.map((budget) => {
      const customer = customers.find(
        (customer) => customer.getId() == budget.getCustomerId(),
      );

      return BudgetDTO(budget, customer as CustomerEntity);
    });
  }

  async updateStatus(uuid: string, status: string) {
    const budget = await this.budgetRepository.findByUuid(uuid);
    switch (status) {
      case BudgetStatus.APPROVED:
        budget.approve();
        const newSale = Sale.new({
          customerId: budget.getCustomerId(),
          details: budget.getDetails(),
          iva: budget.getIva(),
          budgetId: budget.getId(),
          sellerId: budget.getSellerId(),
        });
        await this.saleRepository.save(newSale);
        break;

      case BudgetStatus.REJECTED:
        budget.reject();
        break;

      case BudgetStatus.EXPIRED:
        budget.expirate();

      default:
        throw new Error("Ese estado no es valido para un presupuesto");
    }
    return BudgetDTO(await this.budgetRepository.update(budget));
  }
}
