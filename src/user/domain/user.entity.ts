export interface UserEntity {
  uuid: string;
  email: string;
  password: string;
  role: Roles;
  createdAt: Date;
}

export enum Roles {
  VENTAS = "enc_ventas",
  MONITOREO = "enc_monitoreo",
  ADMIN = "admin",
}
