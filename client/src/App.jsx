import { Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import Layout from './components/layout/Layout'
import AdminLayout from './components/admin/AdminLayout'
import ProtectedRoute from './components/admin/ProtectedRoute'

// Public Pages
import Home from './pages/Home'
import Programs from './pages/Programs'
import ProgramDetail from './pages/ProgramDetail'
import Projects from './pages/Projects'
import News from './pages/News'
import About from './pages/About'
import Contacts from './pages/Contacts'

// Admin Pages
import Login from './pages/admin/Login'
import Dashboard from './pages/admin/Dashboard'
import AdminPrograms from './pages/admin/AdminPrograms'
import AdminProjects from './pages/admin/AdminProjects'
import AdminNews from './pages/admin/AdminNews'
import AdminExperts from './pages/admin/AdminExperts'
import AdminContacts from './pages/admin/AdminContacts'
import AdminMedia from './pages/admin/AdminMedia'
import AdminSettings from './pages/admin/AdminSettings'

function App() {
  return (
    <AuthProvider>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="programs" element={<Programs />} />
          <Route path="programs/:id" element={<ProgramDetail />} />
          <Route path="projects" element={<Projects />} />
          <Route path="news" element={<News />} />
          <Route path="about" element={<About />} />
          <Route path="contacts" element={<Contacts />} />
        </Route>

        {/* Admin Routes */}
        <Route path="/admin/login" element={<Login />} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="programs" element={<AdminPrograms />} />
          <Route path="projects" element={<AdminProjects />} />
          <Route path="news" element={<AdminNews />} />
          <Route path="experts" element={<AdminExperts />} />
          <Route path="contacts" element={<AdminContacts />} />
          <Route path="media" element={<AdminMedia />} />
          <Route path="settings" element={<AdminSettings />} />
        </Route>
      </Routes>
    </AuthProvider>
  )
}

export default App
