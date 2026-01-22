import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('Seeding database...')

  // Create admin user
  const hashedPassword = await bcrypt.hash('admin123', 10)

  const admin = await prisma.user.upsert({
    where: { email: 'admin@simulator.ru' },
    update: {},
    create: {
      email: 'admin@simulator.ru',
      password: hashedPassword,
      name: 'Администратор',
      role: 'admin',
    },
  })
  console.log('Admin user created:', admin.email)

  // Create sample programs
  const programs = [
    {
      title: 'Государственное управление',
      description: 'Комплексная программа подготовки специалистов в области государственного управления. Изучение современных методов и технологий управления, правовых основ деятельности государственных органов.',
      category: 'Управление',
      duration: '6 месяцев',
      format: 'Очно-заочный',
      price: '150 000 ₽',
      isActive: true,
      image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800',
    },
    {
      title: 'Муниципальное управление',
      description: 'Программа для специалистов органов местного самоуправления. Развитие компетенций в области муниципального права, экономики и социальной политики.',
      category: 'Управление',
      duration: '4 месяца',
      format: 'Очный',
      price: '120 000 ₽',
      isActive: true,
      image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800',
    },
    {
      title: 'Региональное развитие',
      description: 'Программа направлена на формирование компетенций в области стратегического планирования и управления развитием регионов.',
      category: 'Развитие',
      duration: '3 месяца',
      format: 'Дистанционный',
      price: '80 000 ₽',
      isActive: true,
      image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800',
    },
  ]

  for (const program of programs) {
    await prisma.program.create({ data: program })
  }
  console.log('Programs created:', programs.length)

  // Create sample projects
  const projects = [
    {
      title: 'Цифровая трансформация региона',
      description: 'Проект по внедрению цифровых технологий в государственное управление субъекта РФ.',
      region: 'Московская область',
      status: 'В работе',
      image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800',
    },
    {
      title: 'Развитие социальной инфраструктуры',
      description: 'Комплексный проект по модернизации объектов социальной сферы.',
      region: 'Нижегородская область',
      status: 'Завершён',
      image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800',
    },
  ]

  for (const project of projects) {
    await prisma.project.create({ data: project })
  }
  console.log('Projects created:', projects.length)

  // Create sample news
  const news = [
    {
      title: 'Старт нового учебного года',
      excerpt: 'Объявляется набор на программы обучения 2024 года.',
      content: 'Региональный симулятор объявляет набор слушателей на образовательные программы нового учебного года. Ждём вас!',
      isPublished: true,
      publishedAt: new Date(),
      image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800',
    },
    {
      title: 'Конференция по государственному управлению',
      excerpt: 'Приглашаем на ежегодную конференцию экспертов.',
      content: 'Состоится ежегодная конференция, посвящённая актуальным вопросам государственного управления.',
      isPublished: true,
      publishedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
      image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800',
    },
  ]

  for (const item of news) {
    await prisma.news.create({ data: item })
  }
  console.log('News created:', news.length)

  // Create sample experts
  const experts = [
    {
      name: 'Иванов Александр Петрович',
      position: 'Профессор, д.э.н.',
      bio: 'Ведущий эксперт в области государственного управления с 20-летним опытом работы.',
      photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
    },
    {
      name: 'Петрова Елена Сергеевна',
      position: 'Доцент, к.ю.н.',
      bio: 'Специалист по муниципальному праву и местному самоуправлению.',
      photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400',
    },
    {
      name: 'Сидоров Михаил Иванович',
      position: 'Эксперт-практик',
      bio: 'Бывший заместитель губернатора, эксперт по региональному развитию.',
      photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400',
    },
  ]

  for (const expert of experts) {
    await prisma.expert.create({ data: expert })
  }
  console.log('Experts created:', experts.length)

  // Create initial settings
  await prisma.settings.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      email: 'info@simulator.ru',
      phone: '+7 (495) 555-12-34',
      address: '119571, г. Москва, пр. Вернадского, д. 82',
      siteTitle: 'Региональный симулятор 2.0',
      siteDescription: 'Образовательная платформа для развития управленческих компетенций',
    },
  })
  console.log('Settings created')

  console.log('Database seeded successfully!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
