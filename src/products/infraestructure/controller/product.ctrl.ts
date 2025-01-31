import { ProductUseCases } from "@/products/application/product.usecase";
import { Request, Response } from "express";

export class ProductController {
  constructor(private readonly productUseCases: ProductUseCases) {}

  public create = async (req: Request, res: Response) => {
    const product = await this.productUseCases.createProduct(req.body);
    res.status(201).json(product);
  };

  public edit = async (req: Request, res: Response) => {};

  public list = async (req: Request, res: Response) => {
    const produdcts = await this.productUseCases.listProducts();
    res.status(200).json(produdcts);
  };
}
