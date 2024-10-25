import { createProduct } from '../controllers/productController.js';

export default async function bulkCreateProducts(req, reply) {
  const products = req.body;
  const results = [];

  for (const product of products) {
    const response = await createProduct({ body: product }, { 
      status: () => ({
        send: (data) => data // Mock de send para evitar resposta prematura
      })
    });
    results.push(response);
  }

  return reply.status(201).send(results);
}
