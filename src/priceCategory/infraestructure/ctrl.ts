import { Request, Response } from "express";
import {
  CreatePriceCategoryDTO,
  EditPriceCategoryDTO,
} from "../adapters/createDTO";
import { priceCategoryUseCases } from "../application/priceCategoryuseCases";

export class PriceCategoryController {
  constructor(private readonly useCases: priceCategoryUseCases) {}

  async create(req: Request, res: Response) {
    const dto = req.body as CreatePriceCategoryDTO;
    const category = await this.useCases.createPriceCategory(dto);
    res.status(201).json(category);
  }

  async list(req: Request, res: Response) {
    const categories = await this.useCases.getAll();
    res.json(categories);
  }

  async update(req: Request, res: Response) {
    const dto = req.body as EditPriceCategoryDTO;
    const category = await this.useCases.update(dto);
    res.json(category);
  }
}
