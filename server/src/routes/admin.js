import { Router } from 'express'
import prisma from '../utils/prisma.js'
import { authenticate } from '../middleware/auth.js'

const router = Router()

// All admin routes require authentication
router.use(authenticate)

// Dashboard stats
router.get('/stats', async (req, res) => {
  try {
    const [programs, projects, news, experts, contacts] = await Promise.all([
      prisma.program.count(),
      prisma.project.count(),
      prisma.news.count(),
      prisma.expert.count(),
      prisma.contactRequest.count(),
    ])

    const activePrograms = await prisma.program.count({
      where: { isActive: true },
    })

    res.json({
      programs,
      projects,
      news,
      experts,
      contacts,
      activePrograms,
    })
  } catch (error) {
    console.error('Get stats error:', error)
    res.status(500).json({ message: 'Ошибка сервера' })
  }
})

// === PROGRAMS CRUD ===
router.get('/programs', async (req, res) => {
  try {
    const programs = await prisma.program.findMany({
      orderBy: { createdAt: 'desc' },
    })
    res.json(programs)
  } catch (error) {
    res.status(500).json({ message: 'Ошибка сервера' })
  }
})

router.post('/programs', async (req, res) => {
  try {
    const program = await prisma.program.create({
      data: req.body,
    })
    res.status(201).json(program)
  } catch (error) {
    console.error('Create program error:', error)
    res.status(500).json({ message: 'Ошибка сервера' })
  }
})

router.put('/programs/:id', async (req, res) => {
  try {
    const program = await prisma.program.update({
      where: { id: parseInt(req.params.id) },
      data: req.body,
    })
    res.json(program)
  } catch (error) {
    console.error('Update program error:', error)
    res.status(500).json({ message: 'Ошибка сервера' })
  }
})

router.delete('/programs/:id', async (req, res) => {
  try {
    await prisma.program.delete({
      where: { id: parseInt(req.params.id) },
    })
    res.json({ success: true })
  } catch (error) {
    console.error('Delete program error:', error)
    res.status(500).json({ message: 'Ошибка сервера' })
  }
})

// === PROJECTS CRUD ===
router.get('/projects', async (req, res) => {
  try {
    const projects = await prisma.project.findMany({
      orderBy: { createdAt: 'desc' },
    })
    res.json(projects)
  } catch (error) {
    res.status(500).json({ message: 'Ошибка сервера' })
  }
})

router.post('/projects', async (req, res) => {
  try {
    const project = await prisma.project.create({
      data: req.body,
    })
    res.status(201).json(project)
  } catch (error) {
    console.error('Create project error:', error)
    res.status(500).json({ message: 'Ошибка сервера' })
  }
})

router.put('/projects/:id', async (req, res) => {
  try {
    const project = await prisma.project.update({
      where: { id: parseInt(req.params.id) },
      data: req.body,
    })
    res.json(project)
  } catch (error) {
    console.error('Update project error:', error)
    res.status(500).json({ message: 'Ошибка сервера' })
  }
})

router.delete('/projects/:id', async (req, res) => {
  try {
    await prisma.project.delete({
      where: { id: parseInt(req.params.id) },
    })
    res.json({ success: true })
  } catch (error) {
    console.error('Delete project error:', error)
    res.status(500).json({ message: 'Ошибка сервера' })
  }
})

// === NEWS CRUD ===
router.get('/news', async (req, res) => {
  try {
    const news = await prisma.news.findMany({
      orderBy: { publishedAt: 'desc' },
    })
    res.json(news)
  } catch (error) {
    res.status(500).json({ message: 'Ошибка сервера' })
  }
})

router.post('/news', async (req, res) => {
  try {
    const news = await prisma.news.create({
      data: {
        ...req.body,
        publishedAt: req.body.publishedAt ? new Date(req.body.publishedAt) : new Date(),
      },
    })
    res.status(201).json(news)
  } catch (error) {
    console.error('Create news error:', error)
    res.status(500).json({ message: 'Ошибка сервера' })
  }
})

router.put('/news/:id', async (req, res) => {
  try {
    const news = await prisma.news.update({
      where: { id: parseInt(req.params.id) },
      data: {
        ...req.body,
        publishedAt: req.body.publishedAt ? new Date(req.body.publishedAt) : undefined,
      },
    })
    res.json(news)
  } catch (error) {
    console.error('Update news error:', error)
    res.status(500).json({ message: 'Ошибка сервера' })
  }
})

router.delete('/news/:id', async (req, res) => {
  try {
    await prisma.news.delete({
      where: { id: parseInt(req.params.id) },
    })
    res.json({ success: true })
  } catch (error) {
    console.error('Delete news error:', error)
    res.status(500).json({ message: 'Ошибка сервера' })
  }
})

// === EXPERTS CRUD ===
router.get('/experts', async (req, res) => {
  try {
    const experts = await prisma.expert.findMany({
      orderBy: { createdAt: 'desc' },
    })
    res.json(experts)
  } catch (error) {
    res.status(500).json({ message: 'Ошибка сервера' })
  }
})

router.post('/experts', async (req, res) => {
  try {
    const expert = await prisma.expert.create({
      data: req.body,
    })
    res.status(201).json(expert)
  } catch (error) {
    console.error('Create expert error:', error)
    res.status(500).json({ message: 'Ошибка сервера' })
  }
})

router.put('/experts/:id', async (req, res) => {
  try {
    const expert = await prisma.expert.update({
      where: { id: parseInt(req.params.id) },
      data: req.body,
    })
    res.json(expert)
  } catch (error) {
    console.error('Update expert error:', error)
    res.status(500).json({ message: 'Ошибка сервера' })
  }
})

router.delete('/experts/:id', async (req, res) => {
  try {
    await prisma.expert.delete({
      where: { id: parseInt(req.params.id) },
    })
    res.json({ success: true })
  } catch (error) {
    console.error('Delete expert error:', error)
    res.status(500).json({ message: 'Ошибка сервера' })
  }
})

// === CONTACTS (read/delete only) ===
router.get('/contacts', async (req, res) => {
  try {
    const contacts = await prisma.contactRequest.findMany({
      orderBy: { createdAt: 'desc' },
    })
    res.json(contacts)
  } catch (error) {
    res.status(500).json({ message: 'Ошибка сервера' })
  }
})

router.delete('/contacts/:id', async (req, res) => {
  try {
    await prisma.contactRequest.delete({
      where: { id: parseInt(req.params.id) },
    })
    res.json({ success: true })
  } catch (error) {
    console.error('Delete contact error:', error)
    res.status(500).json({ message: 'Ошибка сервера' })
  }
})

// === MEDIA ===
router.get('/media', async (req, res) => {
  try {
    const media = await prisma.media.findMany({
      orderBy: { createdAt: 'desc' },
    })
    res.json(media)
  } catch (error) {
    res.status(500).json({ message: 'Ошибка сервера' })
  }
})

router.delete('/media/:id', async (req, res) => {
  try {
    await prisma.media.delete({
      where: { id: parseInt(req.params.id) },
    })
    res.json({ success: true })
  } catch (error) {
    console.error('Delete media error:', error)
    res.status(500).json({ message: 'Ошибка сервера' })
  }
})

// === SETTINGS ===
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
    res.status(500).json({ message: 'Ошибка сервера' })
  }
})

router.put('/settings', async (req, res) => {
  try {
    const settings = await prisma.settings.upsert({
      where: { id: 1 },
      update: req.body,
      create: { id: 1, ...req.body },
    })
    res.json(settings)
  } catch (error) {
    console.error('Update settings error:', error)
    res.status(500).json({ message: 'Ошибка сервера' })
  }
})

export default router
