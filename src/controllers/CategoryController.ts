import { Request, Response } from 'express';
import { CategoryModel } from 'src/models/category';
import { errorHandler } from 'src/helper/errorHelper';
import { publishToQueue } from 'src/helper/messagesBrokerHelper';

export default class CategoryController {
    static async addCategory(req: Request, res: Response) {
        try {
            const category = await CategoryModel.addCategory(req.body);
            await publishToQueue('category', JSON.stringify(category));
            res.status(201).json(category);
        } catch (err) {
            errorHandler(req, res, err);
        }
    }

    static async updateCategory(req: Request, res: Response) {
        try {
            const category = await CategoryModel.updateCategory(req.params.id, req.body);
            res.status(200).json(category);
        } catch (err) {
            errorHandler(req, res, err);
        }
    }

    static async deleteCategory(req: Request, res: Response) {
        try {
            const category = await CategoryModel.deleteCategory(req.params.id);
            res.status(200).json(category);
        } catch (err) {
            errorHandler(req, res, err);
        }
    }

    static async getCategories(req: Request, res: Response) {
        try {
            const categories = await CategoryModel.getCategories();
            res.status(200).json(categories);
        } catch (err) {
            errorHandler(req, res, err);
        }
    }

    static async getCategoryById(req: Request, res: Response) {
        try {
            const category = await CategoryModel.getCategoryById(req.params.id);
            res.status(200).json(category);
        } catch (err) {
            errorHandler(req, res, err);
        }
    }
}
