import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from "react-router";
import root from "./router/root";
import App from './App.tsx'
import { Provider } from "react-redux";
import store from "./store";

createRoot(document.getElementById("root")!).render(
    <Provider store={store}>
        <RouterProvider router={root} />
    </Provider>
);