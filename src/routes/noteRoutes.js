import {
  createNote,
  listNotes,
  updateNote,
  deleteNote,
  addGroupToNote,
  removeGroupFromNote,
} from '../controllers/noteController.js'
import auth from '../middlewares/auth.js'

export default async function noteRoutes(fastify) {
  fastify.post('/notes', { preHandler: auth }, createNote)
  fastify.get('/notes', { preHandler: auth }, listNotes)
  fastify.put('/notes/:id', { preHandler: auth }, updateNote)
  fastify.delete('/notes/:id', { preHandler: auth }, deleteNote)
  fastify.patch(
    '/notes/:noteId/remove-group',
    { preHandler: auth },
    removeGroupFromNote
  )
  fastify.patch(
    '/notes/:noteId/add-group',
    { preHandler: auth },
    addGroupToNote
  )
}
