import { ProductUseCases } from "@/product/application/product.usecase";
import { Request, Response } from "express";

export class ProductController {
  constructor(private readonly productUseCases: ProductUseCases) {}

  public create = async (req: Request, res: Response) => {
    const product = await this.productUseCases.createProduct(req.body);
    res.status(201).json(product);
  };

  public edit = async (req: Request, res: Response) => {
    console.log(req.params);
    const { uuid } = req.params;
    console.log(uuid);
    const product = await this.productUseCases.editProduct(uuid, req.body);
    res.status(200).json(product);
  };

  public list = async (req: Request, res: Response) => {
    const produdcts = await this.productUseCases.listProducts();
    res.status(200).json(produdcts);
  };
}
