import axios from 'axios'

const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token')
      window.location.href = '/admin/login'
    }
    return Promise.reject(error)
  }
)

// Public API
export const programsApi = {
  getAll: () => api.get('/programs'),
  getById: (id) => api.get(`/programs/${id}`),
}

export const projectsApi = {
  getAll: () => api.get('/projects'),
}

export const newsApi = {
  getAll: () => api.get('/news'),
  getById: (id) => api.get(`/news/${id}`),
}

export const expertsApi = {
  getAll: () => api.get('/experts'),
}

export const contactApi = {
  submit: (data) => api.post('/contact', data),
}

export const settingsApi = {
  get: () => api.get('/settings'),
}

// Admin API
export const adminApi = {
  // Programs
  getPrograms: () => api.get('/admin/programs'),
  createProgram: (data) => api.post('/admin/programs', data),
  updateProgram: (id, data) => api.put(`/admin/programs/${id}`, data),
  deleteProgram: (id) => api.delete(`/admin/programs/${id}`),

  // Projects
  getProjects: () => api.get('/admin/projects'),
  createProject: (data) => api.post('/admin/projects', data),
  updateProject: (id, data) => api.put(`/admin/projects/${id}`, data),
  deleteProject: (id) => api.delete(`/admin/projects/${id}`),

  // News
  getNews: () => api.get('/admin/news'),
  createNews: (data) => api.post('/admin/news', data),
  updateNews: (id, data) => api.put(`/admin/news/${id}`, data),
  deleteNews: (id) => api.delete(`/admin/news/${id}`),

  // Experts
  getExperts: () => api.get('/admin/experts'),
  createExpert: (data) => api.post('/admin/experts', data),
  updateExpert: (id, data) => api.put(`/admin/experts/${id}`, data),
  deleteExpert: (id) => api.delete(`/admin/experts/${id}`),

  // Contacts
  getContacts: () => api.get('/admin/contacts'),
  deleteContact: (id) => api.delete(`/admin/contacts/${id}`),

  // Media
  uploadFile: (formData) => api.post('/admin/upload', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  }),
  getMedia: () => api.get('/admin/media'),
  deleteMedia: (id) => api.delete(`/admin/media/${id}`),

  // Settings
  getSettings: () => api.get('/admin/settings'),
  updateSettings: (data) => api.put('/admin/settings', data),

  // Dashboard
  getStats: () => api.get('/admin/stats'),
}

export default api
