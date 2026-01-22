import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Menu, X } from 'lucide-react'

const navigation = [
  { name: 'Главная', href: '/' },
  { name: 'Программы', href: '/programs' },
  { name: 'Проекты', href: '/projects' },
  { name: 'Новости', href: '/news' },
  { name: 'О нас', href: '/about' },
  { name: 'Контакты', href: '/contacts' },
]

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <nav className="container-custom">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">РС</span>
            </div>
            <span className="text-xl font-bold text-primary hidden sm:block">
              Региональный симулятор
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navigation.map((item) => (
              <NavLink
                key={item.name}
                to={item.href}
                className={({ isActive }) =>
                  `text-sm font-medium transition-colors ${
                    isActive
                      ? 'text-primary'
                      : 'text-gray-600 hover:text-primary'
                  }`
                }
              >
                {item.name}
              </NavLink>
            ))}
            <Link to="/contacts" className="btn-primary text-sm">
              Записаться
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            type="button"
            className="lg:hidden p-2 rounded-md text-gray-600 hover:text-primary hover:bg-gray-100"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-4 border-t">
            <div className="flex flex-col space-y-3">
              {navigation.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.href}
                  className={({ isActive }) =>
                    `px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                      isActive
                        ? 'text-primary bg-primary/5'
                        : 'text-gray-600 hover:text-primary hover:bg-gray-50'
                    }`
                  }
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </NavLink>
              ))}
              <div className="px-4 pt-2">
                <Link
                  to="/contacts"
                  className="btn-primary text-sm w-full"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Записаться
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
