import { createBrowserRouter, RouterProvider } from "react-router-dom"
import AppLayout from "./layout/app-layout"
import LandingPage from "./pages/landing"
import Onboarding from "./pages/onboarding"
import JobPage from "./pages/job"
import JobListing from "./pages/job-listing"
import SavedJobs from "./pages/saved-jobs"
import PostJobs from "./pages/post-jobs"
import { ThemeProvider } from "./components/theme.provider"
import ProtectedRoute from "./components/protected-route"
import MyJobs from "./pages/my-jobs"

function App() {
  const routes = [
    {
      element: <AppLayout />,
      children: [
        { path: "/", element: <LandingPage /> },
        { path: "/onboarding", element: <ProtectedRoute><Onboarding /></ProtectedRoute> },
        { path: "/jobs", element: <ProtectedRoute><JobListing /></ProtectedRoute> },
        { path: "/job/:id", element: <ProtectedRoute><JobPage /> </ProtectedRoute>},
        { path: "/saved-jobs", element: <ProtectedRoute><SavedJobs /></ProtectedRoute> },
        { path: "/post-jobs", element: <ProtectedRoute><PostJobs /></ProtectedRoute> },
        { path: "/my-jobs", element: <ProtectedRoute><MyJobs /></ProtectedRoute> },
      ],
    },
  ];

  const router = createBrowserRouter(routes);

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <RouterProvider router={router} />
    </ThemeProvider>
  )
}

export default App
