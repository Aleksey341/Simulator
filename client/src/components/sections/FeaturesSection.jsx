import { Target, Users, Lightbulb, Award, BookOpen, TrendingUp } from 'lucide-react'

const features = [
  {
    icon: Target,
    title: 'Практико-ориентированный подход',
    description: 'Обучение на реальных кейсах и задачах из практики государственного управления.',
  },
  {
    icon: Users,
    title: 'Экспертное сообщество',
    description: 'Работа с ведущими экспертами и практиками в области государственного управления.',
  },
  {
    icon: Lightbulb,
    title: 'Инновационные методики',
    description: 'Использование современных образовательных технологий и методов симуляции.',
  },
  {
    icon: Award,
    title: 'Сертификация',
    description: 'Получение официального сертификата по завершении программы обучения.',
  },
  {
    icon: BookOpen,
    title: 'Актуальные знания',
    description: 'Программы разработаны с учётом последних изменений в законодательстве.',
  },
  {
    icon: TrendingUp,
    title: 'Карьерный рост',
    description: 'Содействие в трудоустройстве и развитии карьеры в государственном секторе.',
  },
]

export default function FeaturesSection() {
  return (
    <section className="section bg-gray-50">
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Почему выбирают нас
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Региональный симулятор — это уникальная образовательная платформа,
            сочетающая теорию и практику государственного управления.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="bg-white rounded-xl p-6 shadow-sm hover:shadow-lg transition-shadow"
            >
              <div className="w-14 h-14 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <feature.icon size={28} className="text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">
                {feature.title}
              </h3>
              <p className="mt-3 text-gray-600">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
