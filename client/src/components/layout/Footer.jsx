import { Link } from 'react-router-dom'
import { Mail, Phone, MapPin } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-primary text-white">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo & Description */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                <span className="text-primary font-bold text-xl">РС</span>
              </div>
              <span className="text-xl font-bold">
                Региональный симулятор
              </span>
            </Link>
            <p className="text-gray-300 text-sm">
              Образовательная платформа для развития управленческих компетенций
              и подготовки кадров для государственного и муниципального управления.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Навигация</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/programs" className="text-gray-300 hover:text-white transition-colors">
                  Программы
                </Link>
              </li>
              <li>
                <Link to="/projects" className="text-gray-300 hover:text-white transition-colors">
                  Проекты
                </Link>
              </li>
              <li>
                <Link to="/news" className="text-gray-300 hover:text-white transition-colors">
                  Новости
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-300 hover:text-white transition-colors">
                  О нас
                </Link>
              </li>
            </ul>
          </div>

          {/* Programs */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Программы</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/programs" className="text-gray-300 hover:text-white transition-colors">
                  Государственное управление
                </Link>
              </li>
              <li>
                <Link to="/programs" className="text-gray-300 hover:text-white transition-colors">
                  Муниципальное управление
                </Link>
              </li>
              <li>
                <Link to="/programs" className="text-gray-300 hover:text-white transition-colors">
                  Региональное развитие
                </Link>
              </li>
            </ul>
          </div>

          {/* Contacts */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Контакты</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <MapPin size={20} className="text-accent flex-shrink-0 mt-0.5" />
                <span className="text-gray-300 text-sm">
                  г. Москва, пр. Вернадского, д. 82
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone size={20} className="text-accent flex-shrink-0" />
                <a href="tel:+74955551234" className="text-gray-300 hover:text-white transition-colors">
                  +7 (495) 555-12-34
                </a>
              </li>
              <li className="flex items-center space-x-3">
                <Mail size={20} className="text-accent flex-shrink-0" />
                <a href="mailto:info@simulator.ru" className="text-gray-300 hover:text-white transition-colors">
                  info@simulator.ru
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-white/10 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} Региональный симулятор. Все права защищены.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link to="/privacy" className="text-gray-400 hover:text-white text-sm transition-colors">
              Политика конфиденциальности
            </Link>
            <Link to="/terms" className="text-gray-400 hover:text-white text-sm transition-colors">
              Условия использования
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
