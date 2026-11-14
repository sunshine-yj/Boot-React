import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from "react-router";
import root from "./router/root";
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
    <RouterProvider router={root} />
)
