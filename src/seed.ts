import dotenv from "dotenv";
import fs from "fs";
import mongoose from "mongoose";
import { CloudCategory } from "./cloudCategory/domain/cloudCategory.entity";
import { CloudCategoryModel } from "./cloudCategory/infraestructure/db.schema";
import { CustomerFactory } from "./customer/domain/CustomerFactory";
import { CustomerModalidad } from "./customer/domain/types";
import { CloudCustomerModel } from "./customer/infraestructure/models/customer.schema";
import { Email } from "./shared/valueObjects/email.vo";
dotenv.config();

const data = fs.readFileSync("cloudclients.json", "utf8");
const jsonData = JSON.parse(data);

async function connect() {
  const MONGO_URI = `mongodb://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@${"212.85.2.215"}:${process.env.MONGO_PORT}/${process.env.MONGO_DB}`;
  await mongoose.connect(MONGO_URI);
}

connect()
  .then(async () => {
    const category = CloudCategory.create("A", 6000);

    await CloudCategoryModel.create({
      uuid: category.getId(),
      name: category.getName(),
      price: category.getPrice(),
      description: category.getDescription(),
    });

    jsonData.forEach(async (customer: any) => {
      try {
        const newCustomer = CustomerFactory.createCustomer({
          firstName: customer.nombre || "sin nombre",
          lastName: customer.apellido || "sin apellido",
          email: Email.create(customer.user_email),
          phone: customer.phone_number || "0000000000",
          modalidad: CustomerModalidad.CLOUD,
          category,
          cuit: customer.cuit ?? "-",
        });

        const baseCustomerData = {
          uuid: newCustomer.getId(),
          firstName: newCustomer.getFirstName(),
          lastName: newCustomer.getLastName(),
          email: newCustomer.getEmail(),
          phone: newCustomer.getPhone(),
          cuit: newCustomer.getCuit(),
          modalidad: newCustomer.getModalidad(),
          status: newCustomer.getStatus(),
          createdAt: newCustomer.getCreatedAt(),
        };

        CloudCustomerModel.create({
          ...baseCustomerData,
          cloudCategoryId: newCustomer.getPriceCategory()?.getId(),
        });
      } catch (error) {
        console.log(error);
      }
    });
  })
  .catch((error) => {
    console.error("❌ Error al conectar MongoDB:", error);
    process.exit(1);
  });
