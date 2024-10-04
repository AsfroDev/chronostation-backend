import { verifyToken } from '../utils/token.js'

export default async function auth(request, reply, next) {
  const authHeader = request.headers.authorization
  if (!authHeader) {
    return reply.status(401).send({ message: 'Unauthorized' })
  }
  
  const token = authHeader.split(' ')[1]

  try {
    const decoded = verifyToken(token)
    request.user = decoded
    next() 
  } catch (error) {
    return reply.status(401).send({ message: 'Invalid Token' })
  }
}
