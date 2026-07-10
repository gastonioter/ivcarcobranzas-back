import { Request, Response } from "express";
import { CreateProductUseCase } from "../application/create.usecase";
import { EditProductUseCase } from "../application/edit.usecase";
import { ListProductsUseCase } from "../application/list.usecase";

export class ProductController {
  constructor(
    private readonly listUseCase: ListProductsUseCase,
    private readonly createUseCase: CreateProductUseCase,
    private readonly editUseCase: EditProductUseCase,
  ) {}

  create = async (req: Request, res: Response) => {
    const product = await this.createUseCase.execute(req.body);
    res.status(201).json(product);
  };

  edit = async (req: Request, res: Response) => {
    const { uuid } = req.params;
    const product = await this.editUseCase.execute(uuid, req.body);
    res.status(200).json(product);
  };

  list = async (req: Request, res: Response) => {
    const products = await this.listUseCase.execute();
    res.status(200).json(products);
  };
}
