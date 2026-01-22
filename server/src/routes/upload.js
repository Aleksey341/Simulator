import { Router } from 'express'
import multer from 'multer'
import path from 'path'
import { fileURLToPath } from 'url'
import prisma from '../utils/prisma.js'
import { authenticate } from '../middleware/auth.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const router = Router()

// Configure multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../../uploads'))
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9)
    cb(null, uniqueSuffix + path.extname(file.originalname))
  },
})

const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp']
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true)
  } else {
    cb(new Error('Недопустимый тип файла'), false)
  }
}

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
})

// Upload files (requires auth)
router.post('/upload', authenticate, upload.array('files', 10), async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: 'Файлы не загружены' })
    }

    const baseUrl = `${req.protocol}://${req.get('host')}`

    const mediaRecords = await Promise.all(
      req.files.map((file) =>
        prisma.media.create({
          data: {
            filename: file.originalname,
            url: `${baseUrl}/uploads/${file.filename}`,
            mimetype: file.mimetype,
            size: file.size,
          },
        })
      )
    )

    res.status(201).json(mediaRecords)
  } catch (error) {
    console.error('Upload error:', error)
    res.status(500).json({ message: 'Ошибка загрузки файлов' })
  }
})

export default router
