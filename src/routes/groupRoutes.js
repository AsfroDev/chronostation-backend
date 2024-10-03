import {
  createGroup,
  listGroups,
  deleteGroup,
  renameGroup,
} from '../controllers/groupController.js'
import auth from '../middlewares/auth.js'

export default async function groupRoutes(fastify) {
  fastify.post('/groups', { preHandler: auth }, createGroup)
  fastify.get('/groups', { preHandler: auth }, listGroups)
  fastify.delete('/groups/:id', { preHandler: auth }, deleteGroup)
  fastify.patch('/groups/:id', { preHandler: auth }, renameGroup)
}
