import { useQuery } from '@tanstack/react-query'
import { Target, Eye, Users, Award } from 'lucide-react'
import { expertsApi } from '../services/api'
import { ExpertCard } from '../components/ui/Card'
import CTASection from '../components/sections/CTASection'

const values = [
  {
    icon: Target,
    title: 'Миссия',
    description:
      'Формирование нового поколения управленцев, способных эффективно решать задачи регионального развития и повышать качество жизни граждан.',
  },
  {
    icon: Eye,
    title: 'Видение',
    description:
      'Стать ведущей образовательной платформой в сфере подготовки кадров для государственного и муниципального управления в России.',
  },
  {
    icon: Users,
    title: 'Ценности',
    description:
      'Профессионализм, инновационность, практическая направленность, открытость и сотрудничество.',
  },
  {
    icon: Award,
    title: 'Принципы',
    description:
      'Индивидуальный подход, ориентация на результат, постоянное развитие и совершенствование программ.',
  },
]

export default function About() {
  const { data: experts, isLoading } = useQuery({
    queryKey: ['experts'],
    queryFn: () => expertsApi.getAll().then((res) => res.data),
  })

  return (
    <>
      {/* Hero */}
      <section className="section bg-gradient-to-br from-primary to-secondary text-white">
        <div className="container-custom">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold">
              О Региональном симуляторе
            </h1>
            <p className="mt-6 text-xl text-gray-200 leading-relaxed">
              Региональный симулятор 2.0 — это инновационная образовательная платформа,
              созданная для подготовки высококвалифицированных специалистов в сфере
              государственного и муниципального управления.
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Наши ценности
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value) => (
              <div
                key={value.title}
                className="bg-gray-50 rounded-xl p-8 hover:shadow-lg transition-shadow"
              >
                <div className="w-14 h-14 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <value.icon size={28} className="text-primary" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">{value.title}</h3>
                <p className="mt-3 text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* History */}
      <section className="section bg-gray-50">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                История создания
              </h2>
              <div className="mt-6 space-y-4 text-gray-600">
                <p>
                  Региональный симулятор был создан в 2014 году командой экспертов
                  в области государственного управления и образования. Идея проекта
                  возникла из необходимости подготовки управленческих кадров,
                  способных эффективно работать в условиях современных вызовов.
                </p>
                <p>
                  За годы работы платформа выпустила более 500 специалистов,
                  которые сегодня успешно работают в органах государственной власти
                  и местного самоуправления по всей России.
                </p>
                <p>
                  В 2020 году был запущен Региональный симулятор 2.0 — обновлённая
                  версия платформы с расширенным функционалом и новыми
                  образовательными программами.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-gray-200">
                <img
                  src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800"
                  alt="Команда"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experts */}
      <section className="section">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Наши эксперты
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Ведущие специалисты в области государственного управления
              и регионального развития.
            </p>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="bg-white rounded-xl p-6 animate-pulse text-center">
                  <div className="w-32 h-32 bg-gray-200 rounded-full mx-auto mb-4" />
                  <div className="h-6 bg-gray-200 rounded w-3/4 mx-auto mb-2" />
                  <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto" />
                </div>
              ))}
            </div>
          ) : experts?.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {experts.map((expert) => (
                <ExpertCard key={expert.id} expert={expert} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-gray-500">
              Информация об экспертах будет добавлена позже.
            </div>
          )}
        </div>
      </section>

      <CTASection />
    </>
  )
}
