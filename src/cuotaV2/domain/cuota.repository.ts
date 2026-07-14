import { Cuota, CuotaStatus } from "./cuota.entity";

export interface CuotaFilters {
  customerId?: string;
  monthStart?: number;
  monthEnd?: number;
  status?: CuotaStatus;
  year?: number;
  uuids?: string[];
}

export interface CuotaRepository {
  findById(uuid: string): Promise<Cuota | null>;
  findAll(filters?: CuotaFilters): Promise<Cuota[]>;
  save(uuid: string, data: Cuota): Promise<void>;
}
