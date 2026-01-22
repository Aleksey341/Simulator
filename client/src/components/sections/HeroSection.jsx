import { Link } from 'react-router-dom'
import { ArrowRight, PlayCircle } from 'lucide-react'

export default function HeroSection() {
  return (
    <section className="relative bg-gradient-to-br from-primary via-primary-light to-secondary overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="container-custom relative">
        <div className="py-20 md:py-32 lg:py-40">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
              Региональный симулятор{' '}
              <span className="text-accent">2.0</span>
            </h1>
            <p className="mt-6 text-xl text-gray-200 leading-relaxed">
              Образовательная платформа для развития управленческих компетенций
              и подготовки кадров для государственного и муниципального управления.
              Уникальная возможность погрузиться в реальные управленческие задачи.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                to="/programs"
                className="btn-accent text-lg"
              >
                Выбрать программу
                <ArrowRight size={20} className="ml-2" />
              </Link>
              <Link
                to="/about"
                className="btn bg-white/10 text-white hover:bg-white/20 backdrop-blur text-lg"
              >
                <PlayCircle size={20} className="mr-2" />
                Узнать больше
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="bg-white/10 backdrop-blur-sm">
        <div className="container-custom py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-white">15+</div>
              <div className="text-gray-300 mt-1">Программ обучения</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-white">500+</div>
              <div className="text-gray-300 mt-1">Выпускников</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-white">50+</div>
              <div className="text-gray-300 mt-1">Экспертов</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-white">20+</div>
              <div className="text-gray-300 mt-1">Регионов России</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
