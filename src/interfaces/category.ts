import { Document, Types, Model } from 'mongoose';

import { Category, CategoryAttributes } from 'src/types/category';

export interface ICategory extends Document, Category {
    _id: Types.ObjectId;
}

export interface ICategoryModel extends Model<ICategory> {
    addCategory(category: CategoryAttributes): Promise<ICategory>;
    updateCategory(id: string, category: Partial<CategoryAttributes>): Promise<ICategory>;
    deleteCategory(id: string): Promise<ICategory>;
    getCategories(): Promise<ICategory[]>;
    getCategoryById(id: string): Promise<ICategory>;
}
