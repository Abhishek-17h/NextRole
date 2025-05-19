import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { Button } from "./components/ui/button"
import AppLayout from "./layout/app-layout"
import LandingPage from "./pages/landing"
import Onboarding from "./pages/onboarding"
import Jobs from "./pages/jobs"
import JobListing from "./pages/job-listing"
import SavedJobs from "./pages/saved-jobs"
import PostJobs from "./pages/post-jobs"
import { ThemeProvider } from "./components/theme.provider"

function App() {
  const router=createBrowserRouter(
    [
      {
        element:<AppLayout/>,
        children:[
          {
            path:"/",
            element:<LandingPage/>
          },
          {
            path:"/onboarding",
            element:<Onboarding/>
          },
          {
            path:"/job-listing",
            element:<JobListing/>
          },
          {
            path:"/jobs/:id",
            element:<Jobs/>
          },
          {
            path:"/saved-jobs",
            element:<SavedJobs/>
          },
          {
            path:"/post-jobs",
            element:<PostJobs/>
          }
        ]
      }
    ]
  )
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
    <RouterProvider router={router}/>
    </ThemeProvider>
  )
}

export default App
