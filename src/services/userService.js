import prisma from '../models/prisma.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret'

// Criar novo usuário e retornar JWT
export async function registerUser({ name, email, loginProvider, password }) {
  // Hash da senha antes de salvar
  const hashedPassword = await bcrypt.hash(password, 10)

  const user = await prisma.user.create({
    data: {
      name,
      email,
      loginProvider,
      password: hashedPassword,
    },
  })

  // Criar token JWT
  const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '1h' })

  return { user, token }
}

// Encontrar usuário por email
export async function findUserByEmail(email) {
  return prisma.user.findUnique({
    where: { email },
  })
}

// Validar credenciais de login e retornar JWT
export async function loginUser(email, password) {
  const user = await findUserByEmail(email)

  if (!user) {
    throw new Error('User not found')
  }

  // Comparar a senha fornecida com o hash salvo
  const isPasswordValid = await bcrypt.compare(password, user.password)

  if (!isPasswordValid) {
    throw new Error('Invalid password')
  }

  // Criar token JWT
  const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '5m' })

  return { user, token }
}
