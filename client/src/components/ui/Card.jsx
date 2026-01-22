import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

export function Card({ children, className = '' }) {
  return (
    <div className={`card ${className}`}>
      {children}
    </div>
  )
}

export function ProgramCard({ program }) {
  return (
    <Card>
      {program.image && (
        <div className="aspect-video overflow-hidden">
          <img
            src={program.image}
            alt={program.title}
            className="w-full h-full object-cover"
          />
        </div>
      )}
      <div className="p-6">
        <span className="text-xs font-semibold text-accent uppercase tracking-wide">
          {program.category}
        </span>
        <h3 className="mt-2 text-xl font-bold text-gray-900">
          {program.title}
        </h3>
        <p className="mt-3 text-gray-600 line-clamp-3">
          {program.description}
        </p>
        <div className="mt-4 flex items-center justify-between">
          <div className="text-sm text-muted">
            {program.duration && <span>{program.duration}</span>}
          </div>
          <Link
            to={`/programs/${program.id}`}
            className="inline-flex items-center text-primary font-medium hover:text-secondary transition-colors"
          >
            Подробнее
            <ArrowRight size={16} className="ml-1" />
          </Link>
        </div>
      </div>
    </Card>
  )
}

export function ProjectCard({ project }) {
  return (
    <Card>
      {project.image && (
        <div className="aspect-video overflow-hidden">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover"
          />
        </div>
      )}
      <div className="p-6">
        <span className="inline-block px-3 py-1 text-xs font-semibold text-white bg-secondary rounded-full">
          {project.status}
        </span>
        <h3 className="mt-3 text-xl font-bold text-gray-900">
          {project.title}
        </h3>
        <p className="mt-3 text-gray-600 line-clamp-3">
          {project.description}
        </p>
        {project.region && (
          <div className="mt-4 text-sm text-muted">
            Регион: {project.region}
          </div>
        )}
      </div>
    </Card>
  )
}

export function NewsCard({ news }) {
  return (
    <Card>
      {news.image && (
        <div className="aspect-video overflow-hidden">
          <img
            src={news.image}
            alt={news.title}
            className="w-full h-full object-cover"
          />
        </div>
      )}
      <div className="p-6">
        <time className="text-sm text-muted">
          {new Date(news.publishedAt).toLocaleDateString('ru-RU', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
          })}
        </time>
        <h3 className="mt-2 text-xl font-bold text-gray-900">
          {news.title}
        </h3>
        <p className="mt-3 text-gray-600 line-clamp-3">
          {news.excerpt}
        </p>
        <Link
          to={`/news/${news.id}`}
          className="mt-4 inline-flex items-center text-primary font-medium hover:text-secondary transition-colors"
        >
          Читать далее
          <ArrowRight size={16} className="ml-1" />
        </Link>
      </div>
    </Card>
  )
}

export function ExpertCard({ expert }) {
  return (
    <Card className="text-center p-6">
      <div className="w-32 h-32 mx-auto rounded-full overflow-hidden bg-gray-200">
        {expert.photo ? (
          <img
            src={expert.photo}
            alt={expert.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-4xl text-gray-400">
            {expert.name.charAt(0)}
          </div>
        )}
      </div>
      <h3 className="mt-4 text-lg font-bold text-gray-900">{expert.name}</h3>
      <p className="text-accent font-medium">{expert.position}</p>
      {expert.bio && (
        <p className="mt-3 text-sm text-gray-600 line-clamp-3">{expert.bio}</p>
      )}
    </Card>
  )
}
