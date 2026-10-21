import crypto from 'crypto'

export function hashPassword(password: string): string {
  const salt = crypto.randomBytes(16).toString('hex')
  const hash = crypto
    .scryptSync(password, salt, 64)
    .toString('hex')
  return `${salt}:${hash}`
}

export function verifyPassword(password: string, stored: string): boolean {
  const [salt, hash] = stored.split(':')
  if (!salt || !hash) return false
  const verifyHash = crypto
    .scryptSync(password, salt, 64)
    .toString('hex')
  return crypto.timingSafeEqual(Buffer.from(hash, 'hex'), Buffer.from(verifyHash, 'hex'))
}

export function generateToken(userId: string): string {
  const payload = JSON.stringify({ sub: userId, iat: Date.now() })
  return Buffer.from(payload).toString('base64url')
}

export function verifyToken(token: string): { sub: string; iat: number } | null {
  try {
    const payload = JSON.parse(Buffer.from(token, 'base64url').toString())
    if (!payload.sub) return null
    return payload
  } catch {
    return null
  }
}

export function getUserIdFromRequest(req: Request): string | null {
  const auth = req.headers.get('authorization')
  if (!auth || !auth.startsWith('Bearer ')) return null
  const token = auth.slice(7)
  const payload = verifyToken(token)
  return payload?.sub || null
}
