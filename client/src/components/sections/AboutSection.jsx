import { Link } from 'react-router-dom'
import { CheckCircle, ArrowRight } from 'lucide-react'

const benefits = [
  'Погружение в реальные управленческие задачи',
  'Работа с экспертами-практиками',
  'Современные технологии обучения',
  'Индивидуальный подход к каждому',
  'Нетворкинг с коллегами из регионов',
  'Поддержка после завершения программы',
]

export default function AboutSection() {
  return (
    <section className="section">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <div className="relative">
            <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-gray-200">
              <img
                src="https://images.unsplash.com/photo-1573167243872-43c6433b9d40?w=800"
                alt="Обучение"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Floating card */}
            <div className="absolute -bottom-6 -right-6 bg-accent text-white p-6 rounded-xl shadow-xl">
              <div className="text-4xl font-bold">10+</div>
              <div className="text-sm">лет опыта</div>
            </div>
          </div>

          {/* Content */}
          <div>
            <span className="text-accent font-semibold uppercase tracking-wide">
              О симуляторе
            </span>
            <h2 className="mt-2 text-3xl md:text-4xl font-bold text-gray-900">
              Уникальная платформа для развития управленческих компетенций
            </h2>
            <p className="mt-4 text-gray-600 leading-relaxed">
              Региональный симулятор 2.0 — это инновационная образовательная
              платформа, созданная для подготовки высококвалифицированных
              специалистов в сфере государственного и муниципального управления.
            </p>
            <p className="mt-4 text-gray-600 leading-relaxed">
              Наша миссия — формирование нового поколения управленцев, способных
              эффективно решать задачи регионального развития и повышать качество
              жизни граждан.
            </p>

            {/* Benefits list */}
            <ul className="mt-6 space-y-3">
              {benefits.map((benefit) => (
                <li key={benefit} className="flex items-center">
                  <CheckCircle size={20} className="text-accent mr-3 flex-shrink-0" />
                  <span className="text-gray-700">{benefit}</span>
                </li>
              ))}
            </ul>

            <Link
              to="/about"
              className="mt-8 inline-flex items-center text-primary font-semibold hover:text-secondary transition-colors"
            >
              Узнать больше о нас
              <ArrowRight size={20} className="ml-2" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
