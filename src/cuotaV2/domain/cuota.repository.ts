import { Cuota, CuotaStatus } from "./cuota.entity";

export interface CuotaFilters {
  customerId?: string;
  uuids?: string[];
  month?: number;
  year?: number;
  status?: CuotaStatus;
}

export interface CuotaRepository {
  findById(uuid: string): Promise<Cuota | null>;
  findAll(filters?: CuotaFilters): Promise<Cuota[]>;
  save(uuid: string, data: Cuota): Promise<void>;
}
