import prisma from '../models/prisma.js'

// Listar notas com filtro de múltiplas palavras no título, corpo e também em grupos
export async function listNotes(req, reply) {
  const { search } = req.query // Assume que a string de busca virá como query param
  try {
    const searchTerms = search?.split(' ') || []
    // Busca por notas ou grupos que contenham qualquer uma das palavras
    const notes = await prisma.note.findMany({
      where: {
        OR: [
          {
            title: {
              contains: searchTerms.join(' '), // Título contendo todas as palavras juntas
              mode: 'insensitive',
            },
          },
          {
            body: {
              contains: searchTerms.join(' '), // Corpo contendo todas as palavras juntas
              mode: 'insensitive',
            },
          },
          {
            group: {
              name: {
                contains: searchTerms.join(' '), // Grupo contendo todas as palavras juntas
                mode: 'insensitive',
              },
            },
          },
        ],
      },
    })

    return reply.status(200).send(notes)
  } catch (error) {
    return reply.status(500).send({ error: 'Failed to list notes' })
  }
}

// Criar uma nova nota
export async function createNote(req, reply) {
  const { title, body, color, groupId, userId } = req.body
  try {
    const newNote = await prisma.note.create({
      data: {
        title,
        body,
        color,
        groupId,
        userId,
      },
    })

    return reply.status(201).send(newNote)
  } catch (error) {
    return reply.status(500).send({ error: 'Failed to create note' })
  }
}

// Atualizar uma nota existente
export async function updateNote(req, reply) {
  const { id } = req.params
  const { title, body, color, groupId, userId } = req.body
  try {
    const updatedNote = await prisma.note.update({
      where: { id },
      data: {
        title,
        body,
        color,
        groupId,
        userId,
      },
    })

    return reply.status(200).send(updatedNote)
  } catch (error) {
    return reply.status(500).send({ error: 'Failed to update note' })
  }
}

// Remover uma nota
export async function deleteNote(req, reply) {
  const { id } = req.params
  try {
    await prisma.note.delete({
      where: { id },
    })

    return reply.status(204).send()
  } catch (error) {
    return reply.status(500).send({ error: 'Failed to delete note' })
  }
}

// Atribuir grupo a uma nota
export async function addGroupToNote(req, reply) {
  const { noteId } = req.params
  const { groupId } = req.body

  try {
    const note = await prisma.note.update({
      where: { id: noteId },
      data: { groupId },
    })

    return reply.status(200).send(note)
  } catch (error) {
    console.error(error)
    return reply.status(500).send({ error: 'Failed to add group to note' })
  }
}

// Remover grupo de uma nota
export async function removeGroupFromNote(req, reply) {
  const { noteId } = req.params

  try {
    const note = await prisma.note.update({
      where: { id: noteId },
      data: { groupId: null },
    })

    return reply.status(200).send(note)
  } catch (error) {
    console.error(error)
    return reply.status(500).send({ error: 'Failed to remove group from note' })
  }
}
