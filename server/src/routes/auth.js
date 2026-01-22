import { Router } from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { body, validationResult } from 'express-validator'
import prisma from '../utils/prisma.js'
import { authenticate } from '../middleware/auth.js'

const router = Router()

// Login
router.post(
  '/login',
  [
    body('email').isEmail().withMessage('Некорректный email'),
    body('password').notEmpty().withMessage('Введите пароль'),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
      }

      const { email, password } = req.body

      const user = await prisma.user.findUnique({
        where: { email },
      })

      if (!user) {
        return res.status(401).json({ message: 'Неверный email или пароль' })
      }

      const isMatch = await bcrypt.compare(password, user.password)

      if (!isMatch) {
        return res.status(401).json({ message: 'Неверный email или пароль' })
      }

      const token = jwt.sign(
        { userId: user.id },
        process.env.JWT_SECRET,
        { expiresIn: '7d' }
      )

      res.json({
        token,
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        },
      })
    } catch (error) {
      console.error('Login error:', error)
      res.status(500).json({ message: 'Ошибка сервера' })
    }
  }
)

// Get current user
router.get('/me', authenticate, (req, res) => {
  res.json(req.user)
})

export default router
