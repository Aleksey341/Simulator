import { Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { ArrowRight } from 'lucide-react'
import { programsApi } from '../../services/api'
import { ProgramCard } from '../ui/Card'

export default function ProgramsSection() {
  const { data: programs, isLoading } = useQuery({
    queryKey: ['programs'],
    queryFn: () => programsApi.getAll().then((res) => res.data),
  })

  // Show only first 3 programs on home page
  const displayedPrograms = programs?.slice(0, 3) || []

  return (
    <section className="section bg-gray-50">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Образовательные программы
            </h2>
            <p className="mt-2 text-gray-600 max-w-xl">
              Выберите программу, которая поможет вам развить необходимые
              компетенции в сфере государственного управления.
            </p>
          </div>
          <Link
            to="/programs"
            className="mt-4 md:mt-0 inline-flex items-center text-primary font-semibold hover:text-secondary transition-colors"
          >
            Все программы
            <ArrowRight size={20} className="ml-2" />
          </Link>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-xl p-6 animate-pulse">
                <div className="aspect-video bg-gray-200 rounded-lg mb-4" />
                <div className="h-4 bg-gray-200 rounded w-1/4 mb-2" />
                <div className="h-6 bg-gray-200 rounded w-3/4 mb-3" />
                <div className="h-4 bg-gray-200 rounded w-full mb-2" />
                <div className="h-4 bg-gray-200 rounded w-2/3" />
              </div>
            ))}
          </div>
        ) : displayedPrograms.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayedPrograms.map((program) => (
              <ProgramCard key={program.id} program={program} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 text-gray-500">
            Программы пока не добавлены
          </div>
        )}
      </div>
    </section>
  )
}
