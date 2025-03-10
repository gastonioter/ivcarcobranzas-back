import { CuotaDTO, cuotaDTO } from "../../cuota/adapters/outputCuotaDTO";
import { Pago } from "../domain/pago.entity";

export interface PagoDTO {
  uuid: string;
  cuotas: CuotaDTO[];
  total: number;
  serie: string;
  createdAt: Date;
}

export function PagoDTO(pago: Pago) {
  return {
    uuid: pago.getId(),
    cuotas: pago.getCuotas().map((cuota) => cuotaDTO(cuota)),
    total: pago.getTotal(),
    serie: pago.getSerie(),
    createdAt: pago.getCreatedAt(),
  };
}
