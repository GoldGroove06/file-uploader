import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import './index.css'
import App from './App.jsx';
import "@radui/ui/themes/default.css";
import Folder from './pages/Folder.jsx';
import ThemeProvider from './components/ThemeProvider.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/folder",
    element: <Folder />
  }
  
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider>
    <RouterProvider router={router} />
    </ThemeProvider>
  </StrictMode>,
)
