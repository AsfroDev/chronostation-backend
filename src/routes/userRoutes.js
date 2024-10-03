import { register, login } from '../controllers/userController.js'

export default async function userRoutes(fastify) {
  fastify.post('/register', register)
  fastify.post('/login', login)
}
