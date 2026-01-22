import { useQuery } from '@tanstack/react-query'
import { projectsApi } from '../services/api'
import { ProjectCard } from '../components/ui/Card'

export default function Projects() {
  const { data: projects, isLoading } = useQuery({
    queryKey: ['projects'],
    queryFn: () => projectsApi.getAll().then((res) => res.data),
  })

  return (
    <div className="section">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
            Государственные проекты
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            Реальные проекты регионального развития, в которых участвуют
            наши выпускники и эксперты.
          </p>
        </div>

        {/* Projects Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-white rounded-xl p-6 animate-pulse shadow-lg">
                <div className="aspect-video bg-gray-200 rounded-lg mb-4" />
                <div className="h-6 bg-gray-200 rounded w-1/4 mb-3" />
                <div className="h-6 bg-gray-200 rounded w-3/4 mb-3" />
                <div className="h-4 bg-gray-200 rounded w-full mb-2" />
                <div className="h-4 bg-gray-200 rounded w-2/3" />
              </div>
            ))}
          </div>
        ) : projects?.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-xl text-gray-500">
              Проекты пока не добавлены.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
