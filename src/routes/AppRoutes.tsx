import { Navigate, Route, Routes } from 'react-router-dom'

import { ProtectedRoute } from '../components/ProtectedRoute'
import { DashboardLayout } from '../layouts/DashboardLayout'
import { LandingDashboardPage } from '../pages/LandingDashboardPage'
import { LoginPage } from '../pages/LoginPage'
import { ModulePlaceholderPage } from '../pages/ModulePlaceholderPage'
import { RegisterPage } from '../pages/RegisterPage'

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route
        path="/dashboard"
        element={
          // <ProtectedRoute>
            <DashboardLayout>
              <LandingDashboardPage />
            </DashboardLayout>
          // </ProtectedRoute>
        }
      />
      <Route
        path="/m/:slug"
        element={
          <ProtectedRoute>
            <DashboardLayout>
              <ModulePlaceholderPage />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  )
}
