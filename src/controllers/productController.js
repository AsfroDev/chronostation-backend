import prisma from '../models/prisma.js'

// Listar produtos com filtro de múltiplas palavras no título, descrição e também em categorias
export async function listProducts(req, reply) {
  const { search } = req.query // Assume que a string de busca virá como query param
  try {
    const searchTerms = search?.split(' ') || []
    // Busca por produtos ou categorias que contenham qualquer uma das palavras
    const products = await prisma.product.findMany({
      where: {
        OR: [
          {
            title: {
              contains: searchTerms.join(' '), // Título contendo todas as palavras juntas
              mode: 'insensitive',
            },
          },
          {
            description: {
              contains: searchTerms.join(' '), // Corpo contendo todas as palavras juntas
              mode: 'insensitive',
            },
          },
          {
            category: {
              name: {
                contains: searchTerms.join(' '), // Grupo contendo todas as palavras juntas
                mode: 'insensitive',
              },
            },
          },
        ],
      },
      include: {
        category: {
          select: {
            name: true,
          },
        },
      },
    })

    return reply.status(200).send(products)
  } catch (error) {
    return reply.status(500).send({ error: 'Falha ao listar produtos' })
  }
}

// Criar um novo produto
export async function createProduct(req, reply) {
  const { title, description, price, categoryId } = req.body
  try {
    const newProduct = await prisma.product.create({
      data: {
        title,
        description,
        price,
        categoryId,
      },
    })

    return reply.status(201).send(newProduct)
  } catch (error) {
    return reply.status(500).send({ error: 'Falha ao criar produto' })
  }
}

// Atualizar um produto existe
export async function updateProduct(req, reply) {
  const { id } = req.params
  const { title, description, price, categoryId } = req.body
  try {
    const updatedNote = await prisma.note.update({
      where: { id },
      data: {
        title,
        description,
        price,
        categoryId,
      },
    })

    return reply.status(200).send(updatedNote)
  } catch (error) {
    return reply.status(500).send({ error: 'Falha ao atualizar produto' })
  }
}

// Remover um produto
export async function deleteProduct(req, reply) {
  const { id } = req.params
  try {
    await prisma.note.delete({
      where: { id },
    })

    return reply.status(204).send()
  } catch (error) {
    return reply.status(500).send({ error: 'Falha ao deletar produto' })
  }
}

// Atribuir categoria existente a uma nota
export async function addCategoryToProduct(req, reply) {
  const { productId } = req.params
  const { categoryId } = req.body

  try {
    const product = await prisma.product.update({
      where: { id: productId },
      data: { categoryId },
    })

    return reply.status(200).send(product)
  } catch (error) {
    console.error(error)
    return reply
      .status(500)
      .send({ error: 'Falha em adicionar categoria ao produto' })
  }
}

// Remover categoria de um produto
export async function removeCategoryFromProduct(req, reply) {
  const { productId } = req.params

  try {
    const product = await prisma.product.update({
      where: { id: productId },
      data: { categoryId: null },
    })

    return reply.status(200).send(product)
  } catch (error) {
    console.error(error)
    return reply
      .status(500)
      .send({ error: 'Falha em remover a categoria do produto' })
  }
}
