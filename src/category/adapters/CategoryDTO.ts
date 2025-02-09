import { BaseDTO } from "../../shared/adapters/BaseDTO";
import { CategoryEntity } from "../../category/domain/category.entity";

export class CategoryDTO extends BaseDTO<CategoryEntity> {
  name: string;
  description: string;
  uuid: string;

  constructor(props: CategoryEntity) {
    super(props);
    // Here we can add some logic to transform the data
    this.name = props.getName();
    this.description = props.getDescription();
    this.uuid = props.getId();
  }
}
