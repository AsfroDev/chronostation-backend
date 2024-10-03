import prisma from '../models/prisma.js'

// Listar grupos com filtro de múltiplas palavras no nome
export async function listGroups(req, reply) {
  const { search } = req.query
  try {
    const searchTerms = search?.split(' ') || []

    const groups = await prisma.group.findMany({
      where: {
        name: {
          contains: searchTerms.join(' '),
          mode: 'insensitive',
        },
      },
    })

    return reply.status(200).send(groups)
  } catch (error) {
    return reply.status(500).send({ error: 'Failed to list groups' })
  }
}

// Criar um grupo
export async function createGroup(req, reply) {
  const { name, userId } = req.body
  try {
    const newGroup = await prisma.group.create({
      data: {
        name,
        userId,
      },
    })

    return reply.status(201).send(newGroup)
  } catch (error) {
    return reply.status(500).send({ error: 'Failed to create group' })
  }
}

// Remover um grupo e suas notas
export async function deleteGroup(req, reply) {
  const { id } = req.params;
  try {
    await prisma.$transaction(async (prisma) => {
      await prisma.note.deleteMany({
        where: { groupId: id },
      });

      await prisma.group.delete({
        where: { id },
      });
    });

    return reply.status(204).send();
  } catch (error) {
    console.error(error);
    return reply.status(500).send({ error: 'Failed to delete group and its notes' });
  }
}

// Mudar nome do grupo
export async function renameGroup(req, reply) {
  const { id } = req.params
  const { name } = req.body

  try {
    await prisma.group.update({
      where: { id },
      data: { name },
    })

    return reply.status(204).send()
  } catch (error) {
    return reply.status(500).send({ error: 'Failed to rename group' })
  }
}
