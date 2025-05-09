import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import './index.css'
import App from './App.jsx';
import "@radui/ui/themes/default.css";
import Folder from './pages/Folder.jsx';
import SignIn from './pages/SignIn.jsx';
import Signup from './pages/Signup.jsx';
import ThemeProvider from './components/ThemeProvider.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/folder",
    element: <Folder />
  },
  {
    path: "signin",
    element: <SignIn />
  },
  {
    path: "signup",
    element: <Signup />
  }


]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>
  </StrictMode>,
)
