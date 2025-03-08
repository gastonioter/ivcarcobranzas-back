import { Cuota, CuotaStatus } from "../domain/cuota.entity";

export interface CuotaDTO {
  uuid: string;
  status: CuotaStatus;
  amount: number;
  year: number;
  month: number;
}

export function cuotaDTO(cuota: Cuota): CuotaDTO {
  return {
    uuid: cuota.getId(),
    status: cuota.getStatus(),
    amount: cuota.getAmount(),
    month: cuota.getMonth() + 1,
    year: cuota.getYear(),
  };
}
