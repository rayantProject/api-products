import { Router } from 'express';
import ProductController from 'src/controllers/ProductControllers';
import CategoryController from 'src/controllers/CategoryController';

const router = Router();

router.post('/', ProductController.addProduct);
router.put('/:id', ProductController.updateProduct);
router.delete('/:id', ProductController.deleteProduct);
router.get('/', ProductController.getProducts);
router.get('/:id', ProductController.getProductById);

router.post('/category', CategoryController.addCategory);
router.put('/category/:id', CategoryController.updateCategory);
router.delete('/category/:id', CategoryController.deleteCategory);
router.get('/category', CategoryController.getCategories);
router.get('/category/:id', CategoryController.getCategoryById);

export default router;
