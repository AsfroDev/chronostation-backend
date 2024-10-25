import { fastify } from 'fastify'
import cors from '@fastify/cors'
import userRoutes from './src/routes/userRoutes.js'
import productRoutes from './src/routes/productRoutes.js'
import groupRoutes from './src/routes/groupRoutes.js'
import bulkCreateProducts from './src/services/bulkService.js';

const server = fastify()
const port = 10000

server.register(cors, {
  origin: 'https://notes-fullstack-frontend-one.vercel.app' || 'http://localhost:1000',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
})

server.register(userRoutes)
server.register(productRoutes)
server.register(groupRoutes)

server.listen({ port: port, host: '0.0.0.0' }, (err, address) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }
  console.log(`Server listening at ${address}`)
})
