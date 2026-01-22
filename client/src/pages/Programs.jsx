import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Search } from 'lucide-react'
import { programsApi } from '../services/api'
import { ProgramCard } from '../components/ui/Card'

export default function Programs() {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('')

  const { data: programs, isLoading } = useQuery({
    queryKey: ['programs'],
    queryFn: () => programsApi.getAll().then((res) => res.data),
  })

  const categories = programs
    ? [...new Set(programs.map((p) => p.category).filter(Boolean))]
    : []

  const filteredPrograms = programs?.filter((program) => {
    const matchesSearch =
      program.title.toLowerCase().includes(search.toLowerCase()) ||
      program.description?.toLowerCase().includes(search.toLowerCase())
    const matchesCategory = !category || program.category === category
    return matchesSearch && matchesCategory
  })

  return (
    <div className="section">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
            Образовательные программы
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            Выберите программу, которая соответствует вашим целям
            и поможет развить необходимые управленческие компетенции.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search
              size={20}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              placeholder="Поиск программ..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="input pl-12"
            />
          </div>
          {categories.length > 0 && (
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="input md:w-64"
            >
              <option value="">Все категории</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          )}
        </div>

        {/* Programs Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-white rounded-xl p-6 animate-pulse shadow-lg">
                <div className="aspect-video bg-gray-200 rounded-lg mb-4" />
                <div className="h-4 bg-gray-200 rounded w-1/4 mb-2" />
                <div className="h-6 bg-gray-200 rounded w-3/4 mb-3" />
                <div className="h-4 bg-gray-200 rounded w-full mb-2" />
                <div className="h-4 bg-gray-200 rounded w-2/3" />
              </div>
            ))}
          </div>
        ) : filteredPrograms?.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPrograms.map((program) => (
              <ProgramCard key={program.id} program={program} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-xl text-gray-500">
              {search || category
                ? 'Программы не найдены. Попробуйте изменить параметры поиска.'
                : 'Программы пока не добавлены.'}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
