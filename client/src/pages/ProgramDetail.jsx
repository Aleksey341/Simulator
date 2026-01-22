import { useParams, Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { ArrowLeft, Clock, Users, Award, Calendar, CheckCircle } from 'lucide-react'
import { programsApi } from '../services/api'

export default function ProgramDetail() {
  const { id } = useParams()

  const { data: program, isLoading, error } = useQuery({
    queryKey: ['program', id],
    queryFn: () => programsApi.getById(id).then((res) => res.data),
  })

  if (isLoading) {
    return (
      <div className="section">
        <div className="container-custom">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-32 mb-8" />
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <div className="h-12 bg-gray-200 rounded w-3/4 mb-4" />
                <div className="h-6 bg-gray-200 rounded w-full mb-2" />
                <div className="h-6 bg-gray-200 rounded w-2/3" />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (error || !program) {
    return (
      <div className="section">
        <div className="container-custom text-center">
          <h1 className="text-2xl font-bold text-gray-900">Программа не найдена</h1>
          <Link to="/programs" className="btn-primary mt-6">
            Вернуться к программам
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="section">
      <div className="container-custom">
        {/* Back link */}
        <Link
          to="/programs"
          className="inline-flex items-center text-primary hover:text-secondary transition-colors mb-8"
        >
          <ArrowLeft size={20} className="mr-2" />
          Все программы
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {program.image && (
              <div className="aspect-video rounded-xl overflow-hidden mb-8">
                <img
                  src={program.image}
                  alt={program.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            <span className="text-accent font-semibold uppercase tracking-wide">
              {program.category}
            </span>
            <h1 className="mt-2 text-3xl md:text-4xl font-bold text-gray-900">
              {program.title}
            </h1>

            <div className="mt-8 prose prose-lg max-w-none">
              <h2>О программе</h2>
              <p>{program.description}</p>

              {program.content && (
                <div dangerouslySetInnerHTML={{ __html: program.content }} />
              )}

              {program.modules && program.modules.length > 0 && (
                <>
                  <h2>Модули программы</h2>
                  <ul>
                    {program.modules.map((module, index) => (
                      <li key={index} className="flex items-start">
                        <CheckCircle size={20} className="text-accent mr-3 mt-1 flex-shrink-0" />
                        <span>{module}</span>
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-gray-50 rounded-xl p-6 sticky top-24">
              <h3 className="text-xl font-bold text-gray-900 mb-6">
                Информация о программе
              </h3>

              <ul className="space-y-4">
                {program.duration && (
                  <li className="flex items-center">
                    <Clock size={20} className="text-primary mr-3" />
                    <div>
                      <div className="text-sm text-muted">Длительность</div>
                      <div className="font-medium">{program.duration}</div>
                    </div>
                  </li>
                )}
                {program.format && (
                  <li className="flex items-center">
                    <Calendar size={20} className="text-primary mr-3" />
                    <div>
                      <div className="text-sm text-muted">Формат</div>
                      <div className="font-medium">{program.format}</div>
                    </div>
                  </li>
                )}
                {program.participants && (
                  <li className="flex items-center">
                    <Users size={20} className="text-primary mr-3" />
                    <div>
                      <div className="text-sm text-muted">Участники</div>
                      <div className="font-medium">{program.participants}</div>
                    </div>
                  </li>
                )}
                {program.certificate && (
                  <li className="flex items-center">
                    <Award size={20} className="text-primary mr-3" />
                    <div>
                      <div className="text-sm text-muted">Сертификат</div>
                      <div className="font-medium">{program.certificate}</div>
                    </div>
                  </li>
                )}
              </ul>

              {program.price && (
                <div className="mt-6 pt-6 border-t">
                  <div className="text-sm text-muted">Стоимость</div>
                  <div className="text-2xl font-bold text-primary">
                    {program.price}
                  </div>
                </div>
              )}

              <Link
                to="/contacts"
                className="btn-accent w-full mt-6"
              >
                Записаться на программу
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
