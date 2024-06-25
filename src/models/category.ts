import { Schema, model } from 'mongoose';
import { ICategory, ICategoryModel } from 'src/interfaces/category';

const categorySchema = new Schema<ICategory>({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
});

categorySchema.statics.addCategory = async function (category) {
    return this.create(category);
};

categorySchema.statics.updateCategory = async function (id, category) {
    return this.findByIdAndUpdate(id, category, { new: true });
};

categorySchema.statics.deleteCategory = async function (id) {
    return this.findByIdAndDelete(id);
};

categorySchema.statics.getCategories = async function () {
    return this.find();
};

categorySchema.statics.getCategoryById = async function (id) {
    return this.findById(id);
};

export const CategoryModel = model<ICategory, ICategoryModel>('Category', categorySchema);
