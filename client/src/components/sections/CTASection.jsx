import { Link } from 'react-router-dom'
import { ArrowRight, Phone } from 'lucide-react'

export default function CTASection() {
  return (
    <section className="section bg-primary">
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Готовы начать обучение?
          </h2>
          <p className="mt-4 text-xl text-gray-300">
            Оставьте заявку и наши специалисты свяжутся с вами
            для консультации по выбору программы обучения.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contacts"
              className="btn-accent text-lg"
            >
              Оставить заявку
              <ArrowRight size={20} className="ml-2" />
            </Link>
            <a
              href="tel:+74955551234"
              className="btn bg-white/10 text-white hover:bg-white/20 backdrop-blur text-lg"
            >
              <Phone size={20} className="mr-2" />
              +7 (495) 555-12-34
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
