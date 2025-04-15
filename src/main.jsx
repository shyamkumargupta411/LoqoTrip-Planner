import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { CreateTrip } from './create-trip'
import Header from './components/ui/custom/Header'
import { Toaster } from 'sonner'
import { GoogleOAuthProvider } from '@react-oauth/google'
import Viewtrip from './view-trip/[tripId]'

const router = createBrowserRouter([
  {
    path :'/' , 
    element:<App/>
  },
  {
    path :'/create-trip',
    element:<CreateTrip/>  
  },
  {
    path :'/view-trip/:tripId',
    element:<Viewtrip/>
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GoogleOAuthProvider clientId='920026312590-3ttmcsomknej6squa12bjn5la3uajm57.apps.googleusercontent.com'>
    <Header/>
    <Toaster/>
    <RouterProvider router={router}/>
    </GoogleOAuthProvider>
  </StrictMode>,
)
