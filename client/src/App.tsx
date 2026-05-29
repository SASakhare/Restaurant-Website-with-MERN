import Login from "./auth/Login"
import React from "react"
import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom"
import Singup from "./auth/Singup"
import ForgotPassword from "./auth/ForgotPassword"
import ResetPassword from "./auth/ResetPassword"
import VerifyEmail from "./auth/VerifyEmail"
import MainLayout from "./layout/MainLayout"
import HeroSection from "./components/HeroSection"
import Profile from "./components/Profile"
import SearchPage from "./components/SearchPage"
import RestaurantDetail from "./components/RestaurantDetail"
import Cart from "./components/Cart"
import Restaurant from "./admin/Restaurant"
import AddMenu from "./admin/AddMenu"
import Orders from "./admin/Orders"
import Success from "./components/Success"
import { useUserStore } from "./store/useUserStore"


const ProtectedRoutes = ({ children }: { children: React.ReactNode }) => {

  const { isAuthenticated, user } = useUserStore();

  if (!isAuthenticated) {
    return <Navigate to={'/login'} replace />
  }

  if (!user?.isVerified) {
    return <Navigate to={'/verify-email'} replace />
  }

  return children;
}

const IsAuthenticatedUser = ({ children }: { children: React.ReactNode }) => {

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { isAuthenticated, user } = useUserStore();

  if (isAuthenticated && user?.isVerified) {
    return <Navigate to={'/'} replace />
  }

  return children;
}

const AdminRoute = ({ children }: { children: React.ReactNode }) => {

  const { user, isAuthenticated } = useUserStore();

  if (!isAuthenticated) {
    return <Navigate to={'/login'} replace />
  }

  if (!user?.admin) {
    return <Navigate to={'/'} replace />
  }

  return children
}

const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <ProtectedRoutes> <MainLayout /> </ProtectedRoutes>,
    children: [
      {
        path: "/",
        element: <HeroSection />
      },
      {
        path: "/profile",
        element: <Profile />
      },
      {
        path: "/search/:text",
        element: <SearchPage />
      },
      {
        path: "/restaurant/:id",
        element: <RestaurantDetail />
      },
      {
        path: "/cart/",
        element: <Cart />
      },
      {
        path: "/order/status",
        element: <Success />
      },
      // * admin service start from here
      {
        path: "/admin/restaurant",
        element:<AdminRoute> <Restaurant /> </AdminRoute>
      },
      {
        path: "/admin/menu",
        element:<AdminRoute>  <AddMenu /> </AdminRoute> 
      },
      {
        path: "/admin/orders",
        element:<AdminRoute>  <Orders /></AdminRoute> 
      },
    ]
  },
  {
    path: "/login",
    element: <IsAuthenticatedUser><Login /></IsAuthenticatedUser>
  },
  {
    path: "/singup",
    element: <IsAuthenticatedUser><Singup /></IsAuthenticatedUser>
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