import { Request, Response } from "express";
import { CreateUseCase} from "../application/create.usecase";
import { ListUseCase } from "../application/list.usecase";

export class CategoryController {
  constructor(private readonly listUseCase: ListUseCase, private readonly createUseCase: CreateUseCase) {}

  public createCategory = async (req: Request, res: Response) => {
    const newCategroy = await this.createUseCase.execute(req.body);
    res.status(201).json(newCategroy);
  };

  public findAllCategories = async (req: Request, res: Response) => {
    const categories = await this.listUseCase.execute();
    res.status(200).json(categories);
  };
}
