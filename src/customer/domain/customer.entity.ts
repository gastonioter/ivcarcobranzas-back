export interface CustomerEntity {
  uuid: string;
  firstName: string;
  lastName: string;
  email?: string;
  type: CustomerType;
  phone: string;
  status: string;
  montoMes?: number;
  createdAt: Date;
  updatedAt: Date;
}

export enum CustomerType {
  REGULAR = "regular",
  CLOUD = "cloud",
}
export enum CustomerStatus {
  ACTIVE = "active",
  INACTIVE = "inactive",
}
