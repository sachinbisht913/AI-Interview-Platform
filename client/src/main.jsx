import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { Toaster } from "react-hot-toast";
import { SidebarProvider } from "./context/SidebarContext";


createRoot(document.getElementById('root')).render(
    <StrictMode>
        <Provider store={store}>
            <BrowserRouter>

                <Toaster
                    position="top-right"
                    reverseOrder={false}
                />

<SidebarProvider>
    <App />
</SidebarProvider>

            </BrowserRouter>
        </Provider>
    </StrictMode>
);