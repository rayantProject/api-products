import { Document, Types, Model } from 'mongoose';
import { Product, ProductAttributes } from 'src/types/product';

export interface IProduct extends Document, Product {
    _id: Types.ObjectId;
}

export interface IProductModel extends Model<IProduct> {
    addProduct(product: ProductAttributes): Promise<IProduct>;
    updateProduct(id: string, product: Partial<ProductAttributes>): Promise<IProduct>;
    deleteProduct(id: string): Promise<IProduct>;
    getProducts(): Promise<IProduct[]>;
    getProductById(id: string): Promise<IProduct>;
}
