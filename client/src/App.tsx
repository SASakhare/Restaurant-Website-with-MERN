import Login from "./auth/Login"

import { BrowserRouter, createBrowserRouter, RouterProvider } from "react-router-dom"
import MainLayout from "./MainLayout"
import Singup from "./auth/Singup"

const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />
  },
  {
    path: "/login",
    element: <Login />
  }, {
    path: "/singup",
    element: <Singup />
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