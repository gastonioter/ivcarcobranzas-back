import { CategoryUseCases } from "@/category/application/categoryUseCases";
import { CategoryAlreadyExists } from "../../domain/categories.exceptions";
import { NextFunction, Request, Response } from "express";
import { CategoryDTO } from "../dto/CategoryDTO";
import { CreateCategoryDTO } from "../../adapters/createCategoryDTO";

export class CategoryController {
  constructor(private readonly categoryUserCase: CategoryUseCases) {}

  public createCategory = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    const { name, description } = req.body;
    const categoryData = CreateCategoryDTO.fromRequest({ name, description });

    const newCategroy =
      await this.categoryUserCase.createCategory(categoryData);
    res.status(201).json(newCategroy);
  };

  public findAllCategories = async (req: Request, res: Response) => {
    const categories = await this.categoryUserCase.findAllCategories();
    res.status(200).json(categories);
  };
}
