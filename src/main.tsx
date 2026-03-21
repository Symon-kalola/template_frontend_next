import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'

import { AuthProvider } from './context/AuthProvider'
import { ThemeModeProvider } from './context/ThemeModeProvider'
import App from './App.tsx'
import './i18n'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeModeProvider>
        <AuthProvider>
          <App />
        </AuthProvider>
      </ThemeModeProvider>
    </BrowserRouter>
  </StrictMode>,
)
