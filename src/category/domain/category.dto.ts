import { CategoryEntity } from "./category.entity";

export const categoryDTO = (obj: any): CategoryEntity => {
  console.log(obj);
  return {
    uuid: obj.uuid,
    name: obj.name,
    description: obj.description as string,
    createdAt: obj.createdAt,
  };
};
