import { CategoryUseCases } from "@/category/application/categoryUseCases";
import { NextFunction, Request, Response } from "express";

export class CategoryController {
  constructor(private readonly categoryUserCase: CategoryUseCases) {}

  public createCategory = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    const { name, description } = req.body;

    const newCategroy = await this.categoryUserCase.createCategory({
      name,
      description,
    });
    
    res.status(201).json(newCategroy);
  };

  public findAllCategories = async (req: Request, res: Response) => {
    const categories = await this.categoryUserCase.findAllCategories();
    res.status(200).json(categories);
  };
}
