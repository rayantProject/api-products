import { Schema, model } from 'mongoose';
import { IProduct, IProductModel } from 'src/interfaces/product';
import { Stock } from 'src/types/product';

const StockSchema = new Schema<Stock>({
    quantity_available: {
        type: Number,
        required: true,
    },
    last_updated: {
        type: Date,
        default: Date.now,
    },
});

const productSchema = new Schema<IProduct>(
    {
        name: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        stock: {
            type: StockSchema,
            required: true,
        },
        category: {
            type: [Schema.Types.ObjectId],
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

productSchema.statics.addProduct = async function (product) {
    return this.create(product);
};

productSchema.statics.updateProduct = async function (id, product) {
    return this.findByIdAndUpdate(id, product, { new: true });
};

productSchema.statics.deleteProduct = async function (id) {
    return this.findByIdAndDelete(id);
};

productSchema.statics.getProducts = async function () {
    return this.find();
};

productSchema.statics.getProductById = async function (id) {
    return this.findById(id);
};

export const ProductModel = model<IProduct, IProductModel>('Product', productSchema);
