import { Request, Response } from 'express';
import ProductsRepository from '../repositories/ProductsRepository';

class ProductController {
  async index(request: Request, response: Response) {
    const products = await ProductsRepository.findAll();
    response.json(products);
  }

  async show(request: Request, response: Response) {
    const { name } = request.params;

    // if (id) {
    //   const product = await ProductsRepository.findById(id);

    //   if (!product) {
    //     return response.status(404).json({ message: 'Product not found' });
    //   }

    //   return response.json(product);
    // }

    const product = await ProductsRepository.findByName(name);

    if (!product) {
      return response.status(404).json({ message: 'Product not found' });
    }

    response.json(product);
  }

  async create(request: Request, response: Response) {
    const { name, price } = request.body;

    if (!name || !price) {
      return response.status(400).json({ error: 'Campos requiridos' });
    }

    const image = request.file?.filename;
    const field = request.file?.fieldname;

    const product = await ProductsRepository.create({
      name,
      price,
      img: {
        url: `http://localhost:3333/images/${image}`,
        title: field || 'photo do produto',
      },
    });

    response.json(product);
  }

  async update(request: Request, response: Response) {
    const { id } = request.params;
    const body = request.body;

    const image = request.file?.filename;
    const field = request.file?.fieldname;

    const productExist = await ProductsRepository.findById(id);

    if (!productExist) {
      return response.status(404).json({ error: 'Produto não encontrado' });
    }

    const product = await ProductsRepository.update({
      ...productExist,
      ...body,
      img: {
        url: `http://localhost:3333/images/${image}`,
        title: field || 'photo do produto',
      },
    });

    response.json(product);
  }

  async delete(request: Request, response: Response) {
    const { id } = request.params;

    await ProductsRepository.delete(id);

    response.sendStatus(204);
  }
}

export default new ProductController();
