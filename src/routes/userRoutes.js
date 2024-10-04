import { register, login, auth } from '../controllers/userController.js'

export default async function userRoutes(fastify) {
  fastify.post('/register', register)
  fastify.post('/login', login)
  fastify.post('/auth', auth)
}
