import { fastify } from 'fastify'
import cors from '@fastify/cors'
import userRoutes from './src/routes/userRoutes.js'
import noteRoutes from './src/routes/noteRoutes.js'
import groupRoutes from './src/routes/groupRoutes.js'

const server = fastify()
const port = 10000

server.register(cors, {
  origin: 'https://notes-fullstack-frontend-one.vercel.app',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
});

server.register(userRoutes)
server.register(noteRoutes)
server.register(groupRoutes)

server.listen({ port: port || 8080, host: '0.0.0.0' }, (err, address) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }
  console.log(`Server listening at ${address}`)
})
