import jwt from 'jsonwebtoken'

export default function generateToken(data) {
  return jwt.sign(data, process.env.JWT_SECRET);
}