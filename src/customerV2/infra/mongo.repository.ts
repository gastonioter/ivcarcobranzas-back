import { Customer } from "../domain/customer.entity.";
import { CustomerModel, ICustomer } from "./customer.schema";

export interface CustomerRepository {
  findById(uuid: string): Promise<null | Customer>
  save(uuid: string, data: Customer): Promise<void>
}

export class MongoCustomerRepository implements CustomerRepository {
  async findById(uuid: string): Promise< null | Customer > {
    const doc = await CustomerModel.findOne({ uuid });
    if (!doc) return null;
    return this.toDomain(doc);
  }

  async findAll(): Promise<Customer[]> {
    const docs = await CustomerModel.find();
    return docs.map((doc: ICustomer) => this.toDomain(doc));
  }

  async save(uuid: string, data: Customer): Promise<void> {
    await CustomerModel.findOneAndUpdate(
      { uuid },
      this.toPersistence(data),
      { upsert: true, new: true },
    );
  }

  private toPersistence(customer: Customer): ICustomer {
    return {
      uuid: customer.getId(),
      firstName: customer.firstName,
      lastName: customer.lastName,
      email: customer.email,
      phone: customer.phone,
      cuit: customer.cuit,
      status: customer.status,
      type: customer.type,
      createdAt: customer.createdAt,
    } as ICustomer;
  }

  private toDomain(doc: ICustomer): Customer {
    return Customer.fromPersistence({
      uuid: doc.uuid,
      firstName: doc.firstName,
      lastName: doc.lastName,
      email: doc.email,
      phone: doc.phone,
      cuit: doc.cuit,
      status: doc.status,
      type: doc.type,
      createdAt: doc.createdAt,
    });
  }
}