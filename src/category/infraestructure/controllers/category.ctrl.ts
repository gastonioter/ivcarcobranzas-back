import { CategoryUseCases } from "@/category/application/categoryUseCases";
import { CategoryAlreadyExists } from "../../domain/categories.exceptions";
import { NextFunction, Request, Response } from "express";

export class CategoryController {
  constructor(private readonly categoryUserCase: CategoryUseCases) {}

  public createCategory = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      
      const category = await this.categoryUserCase.createCategory(req.body);
      res.status(201).json(category);
    } catch (e) {
      if (e instanceof CategoryAlreadyExists) {
        res.status(409).json({ error: e.message });
      }
      next(e);
    }
  };

  public findAllCategories = async (req: Request, res: Response) => {
    const categories = await this.categoryUserCase.findAllCategories();
    res.status(200).json(categories);
  };
}
