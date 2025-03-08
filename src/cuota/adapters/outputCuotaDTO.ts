import { Cuota, CuotaStatus } from "../domain/cuota.entity";

export interface CuotaDTO {
  uuid: string;
  serie: string;
  status: CuotaStatus;
  amount: number;
  year: number;
  month: number;
  createdAt: Date;
}

export function cuotaDTO(cuota: Cuota): CuotaDTO {
  return {
    uuid: cuota.getId(),
    status: cuota.getStatus(),
    amount: cuota.getAmount(),
    month: cuota.getMonth() + 1,
    year: cuota.getYear(),
    serie: cuota.getSerie(),
    createdAt: cuota.getCreatedAt(),
  };
}
