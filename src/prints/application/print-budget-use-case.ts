import { Budget } from "../../components/pdfs/Budget";
import { CustomerRepository } from "../../customer/domain/interfaces/CustomerRepository";
import { BudgetRepository } from "../../transaction/budget/domain/budget.repository";
import { companyInfo } from "../constants";
let renderToStream: any;
export class PrintBudgetUseCase {
  constructor(
    private readonly budgetRepo: BudgetRepository,
    private readonly customerRepo: CustomerRepository,
  ) {}

  async printBudget(uuid: string) {
    const budget = await this.budgetRepo.findByUuid(uuid);
    const customer = await this.customerRepo.getCustomer(
      budget.getCustomerId(),
    );
    if (!budget) {
      throw new Error("Budget not found");
    }
    if (!customer) {
      throw new Error("Customer not found");
    }

    // Imporve with dependency injection
    if (!renderToStream) {
      renderToStream = (await import("@react-pdf/renderer")).renderToStream;
    }

    const pdfStream = await renderToStream(
      await Budget({
        company: companyInfo,
        customer: {
          firstName: customer.getFirstName(),
          lastName: customer.getLastName(),
          email: customer.getEmail(),
          phone: customer.getPhone(),
        },
        details: budget.getDetails().map((d) => ({
          quantity: d.quantity,
          description: d.product,
          price: d.unitPrice,
          total: d.unitPrice * d.quantity,
        })),
        transaction: {
          date: budget.getCreatedAt().toISOString(),
          id: budget.getSerie(),
          iva: budget.getIva(),
          total: budget.getTotalAmount(),
          subtotal: budget.getSubtotal(),
        },
      }),
    );

    return {
      pdfStream,
      filename: `${budget.getSerie()}`,
    };
  }
}
