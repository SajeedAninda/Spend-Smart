import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Login from './Components/Authentication/Login/Login.jsx'
import AuthProvider from './Components/Authentication/AuthenticationProvider/AuthProvider.jsx'
import { Toaster } from 'react-hot-toast'
import Register from './Components/Authentication/Register/Register.jsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Homepage from './Components/Navbar/Pages/Homepage/Homepage.jsx'
import Transactions from './Components/Pages/Transactions/Transactions.jsx'
import Budget from './Components/Pages/Budget/Budget'
import PiggyBank from './Components/Pages/PiggyBank/PiggyBank'
import Bills from './Components/Pages/Bills/Bills'
import PrivateRoute from './Components/Authentication/PrivateRoute/PrivateRoute'

const queryClient = new QueryClient()

const router = createBrowserRouter([
  {
    path: '/',
    element: <App></App>,
    children: [
      {
        path: '/',
        element: <Homepage></Homepage>
      },
      {
        path: '/transactions',
        element: (
          <PrivateRoute>
            <Transactions></Transactions>
          </PrivateRoute>
        )
      },
      {
        path: '/budget',
        element: (
          <PrivateRoute>
            <Budget></Budget>
          </PrivateRoute>
        )
      },
      {
        path: '/piggy_bank',
        element: (
          <PrivateRoute>
            <PiggyBank></PiggyBank>
          </PrivateRoute>
        )
      },
      {
        path: '/recurring_bills',
        element: (
          <PrivateRoute>
            <Bills></Bills>
          </PrivateRoute>
        )
      }
    ]
  },
  {
    path: '/login',
    element: <Login></Login>
  },
  {
    path: '/register',
    element: <Register></Register>
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Toaster />
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </QueryClientProvider>
  </StrictMode>
)
