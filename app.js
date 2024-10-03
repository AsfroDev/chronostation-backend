import { fastify } from 'fastify'
import cors from '@fastify/cors';
import userRoutes from './src/routes/userRoutes.js'
import noteRoutes from './src/routes/noteRoutes.js'
import groupRoutes from './src/routes/groupRoutes.js'

const server = fastify()

server.register(cors, {
  origin: 'http://localhost:3000',
});

server.register(userRoutes)
server.register(noteRoutes)
server.register(groupRoutes)

server.listen({ port: 8080, host: '0.0.0.0' }, (err, address) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }
  console.log(`Server listening at ${address}`)
})
