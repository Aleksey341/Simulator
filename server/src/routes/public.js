import { Router } from 'express'
import { body, validationResult } from 'express-validator'
import prisma from '../utils/prisma.js'

const router = Router()

// Get all programs (public)
router.get('/programs', async (req, res) => {
  try {
    const programs = await prisma.program.findMany({
      where: { isActive: true },
      orderBy: { createdAt: 'desc' },
    })
    res.json(programs)
  } catch (error) {
    console.error('Get programs error:', error)
    res.status(500).json({ message: 'Ошибка сервера' })
  }
})

// Get program by ID (public)
router.get('/programs/:id', async (req, res) => {
  try {
    const program = await prisma.program.findUnique({
      where: { id: parseInt(req.params.id) },
    })

    if (!program) {
      return res.status(404).json({ message: 'Программа не найдена' })
    }

    res.json(program)
  } catch (error) {
    console.error('Get program error:', error)
    res.status(500).json({ message: 'Ошибка сервера' })
  }
})

// Get all projects (public)
router.get('/projects', async (req, res) => {
  try {
    const projects = await prisma.project.findMany({
      orderBy: { createdAt: 'desc' },
    })
    res.json(projects)
  } catch (error) {
    console.error('Get projects error:', error)
    res.status(500).json({ message: 'Ошибка сервера' })
  }
})

// Get all news (public)
router.get('/news', async (req, res) => {
  try {
    const news = await prisma.news.findMany({
      where: { isPublished: true },
      orderBy: { publishedAt: 'desc' },
    })
    res.json(news)
  } catch (error) {
    console.error('Get news error:', error)
    res.status(500).json({ message: 'Ошибка сервера' })
  }
})

// Get news by ID (public)
router.get('/news/:id', async (req, res) => {
  try {
    const news = await prisma.news.findUnique({
      where: { id: parseInt(req.params.id) },
    })

    if (!news || !news.isPublished) {
      return res.status(404).json({ message: 'Новость не найдена' })
    }

    res.json(news)
  } catch (error) {
    console.error('Get news error:', error)
    res.status(500).json({ message: 'Ошибка сервера' })
  }
})

// Get all experts (public)
router.get('/experts', async (req, res) => {
  try {
    const experts = await prisma.expert.findMany({
      orderBy: { createdAt: 'desc' },
    })
    res.json(experts)
  } catch (error) {
    console.error('Get experts error:', error)
    res.status(500).json({ message: 'Ошибка сервера' })
  }
})

// Submit contact form
router.post(
  '/contact',
  [
    body('name').notEmpty().withMessage('Введите имя'),
    body('email').isEmail().withMessage('Некорректный email'),
    body('message').notEmpty().withMessage('Введите сообщение'),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
      }

      const { name, email, phone, program, message } = req.body

      const contact = await prisma.contactRequest.create({
        data: { name, email, phone, program, message },
      })

      res.status(201).json({ success: true, id: contact.id })
    } catch (error) {
      console.error('Contact submit error:', error)
      res.status(500).json({ message: 'Ошибка сервера' })
    }
  }
)

// Get settings (public)
router.get('/settings', async (req, res) => {
  try {
    let settings = await prisma.settings.findUnique({
      where: { id: 1 },
    })

    if (!settings) {
      settings = await prisma.settings.create({
        data: { id: 1 },
      })
    }

    res.json(settings)
  } catch (error) {
    console.error('Get settings error:', error)
    res.status(500).json({ message: 'Ошибка сервера' })
  }
})

export default router
