import { registerUser, loginUser } from '../services/userService.js'

export async function register(req, reply) {
  const { email, password, name, loginProvider } = req.body
  try {
    const token = await registerUser({ email, password, name, loginProvider })
    return reply.status(201).send({ token })
  } catch (error) {
    return reply.status(400).send({ error: error.message })
  }
}

export async function login(req, reply) {
  const { email, password } = req.body
  try {
    const token = await loginUser(email, password)
    return reply.status(200).send({ token })
  } catch (error) {
    return reply.status(400).send({ error: error.message })
  }
}
