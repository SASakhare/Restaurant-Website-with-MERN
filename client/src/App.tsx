import Login from "./auth/Login"

import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Singup from "./auth/Singup"
import ForgotPassword from "./auth/ForgotPassword"
import ResetPassword from "./auth/ResetPassword"
import VerifyEmail from "./auth/VerifyEmail"
import MainLayout from "./layout/MainLayout"
import HeroSection from "./components/HeroSection"

const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <HeroSection />
      }
    ]
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/singup",
    element: <Singup />
  },
  {
    path: "/forgot-password",
    element: <ForgotPassword />
  },
  {
    path: "/reset-password",
    element: <ResetPassword />
  },
  {
    path: "/verify-email",
    element: <VerifyEmail />
  },
])

function App() {
  return (
    <main>
      <RouterProvider router={appRouter}>
      </RouterProvider>
    </main>
  )
}

export default App