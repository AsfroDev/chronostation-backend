import {
  createProduct,
  listProducts,
  updateProduct,
  deleteProduct,
  removeCategoryFromProduct,
  addCategoryToProduct,
} from '../controllers/productController.js'
import auth from '../middlewares/auth.js'
import bulkCreateProducts from '../services/bulkService.js';

export default async function productRoutes(fastify) {
  fastify.post('/products', { preHandler: auth }, createProduct)
  fastify.post('/bulk-upload', bulkCreateProducts)
  fastify.get('/products', listProducts)
  fastify.put('/products/:id', { preHandler: auth }, updateProduct)
  fastify.delete('/products/:id', { preHandler: auth }, deleteProduct)
  fastify.patch(
    '/products/:productId/remove-category',
    { preHandler: auth },
    removeCategoryFromProduct
  )
  fastify.patch(
    '/products/:productId/add-category',
    { preHandler: auth },
    addCategoryToProduct
  )
}
