import { CreateProductDTO } from "./create.dto";

export interface EditProductDTO extends CreateProductDTO {
  uuid: string;
}
