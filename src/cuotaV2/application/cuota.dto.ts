import { Cuota, CuotaStatus } from "../domain/cuota.entity";

export interface CuotaDTO {
  uuid: string;
  customerId: string;
  year: number;
  month: number;
  amount: number;
  status: CuotaStatus;
  serie: string;
}

export const toDTO = (cuota: Cuota): CuotaDTO => ({
  uuid: cuota.getId(),
  customerId: cuota.customerId,
  year: cuota.year,
  month: cuota.month,
  amount: cuota.amount,
  status: cuota.status,
  serie: cuota.getSerie(),
});
