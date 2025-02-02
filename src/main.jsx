import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Login from './Components/Authentication/Login/Login.jsx'
import AuthProvider from './Components/Authentication/AuthenticationProvider/AuthProvider.jsx'
import { Toaster } from 'react-hot-toast'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App></App>
  },
  {
    path: '/login',
    element: <Login></Login>
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Toaster />
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>
)
