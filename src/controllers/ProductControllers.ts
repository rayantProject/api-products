import { Request, Response } from 'express';
import { ProductModel } from 'src/models/product';
import { errorHandler } from 'src/helper/errorHelper';
import { publishToQueue } from 'src/helper/messagesBrokerHelper';

export default class ProductController {
    static async addProduct(req: Request, res: Response) {
        try {
            const product = await ProductModel.addProduct(req.body);
            await publishToQueue('product', JSON.stringify(product));
            res.status(201).json(product);
        } catch (err) {
            errorHandler(req, res, err);
        }
    }

    static async updateProduct(req: Request, res: Response) {
        try {
            const product = await ProductModel.updateProduct(req.params.id, req.body);
            res.status(200).json(product);
        } catch (err) {
            errorHandler(req, res, err);
        }
    }

    static async deleteProduct(req: Request, res: Response) {
        try {
            const product = await ProductModel.deleteProduct(req.params.id);
            res.status(200).json(product);
        } catch (err) {
            errorHandler(req, res, err);
        }
    }

    static async getProducts(req: Request, res: Response) {
        try {
            const products = await ProductModel.getProducts();
            res.status(200).json(products);
        } catch (err) {
            errorHandler(req, res, err);
        }
    }

    static async getProductById(req: Request, res: Response) {
        try {
            const product = await ProductModel.getProductById(req.params.id);
            res.status(200).json(product);
        } catch (err) {
            errorHandler(req, res, err);
        }
    }
}
