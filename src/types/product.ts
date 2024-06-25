import { Types } from 'mongoose';

export type Stock = {
    quantity_available: number;
    last_updated: Date;
};

export type Product = {
    name: string;
    description: string;
    price: number;
    stock: Stock;
    category: Types.ObjectId[];
};
export type ProductAttributes = Product;
