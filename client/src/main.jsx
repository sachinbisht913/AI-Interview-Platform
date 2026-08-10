import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";

import { Toaster } from "react-hot-toast";

import { SidebarProvider } from "./context/SidebarContext";
import { ThemeProvider } from "./context/ThemeContext";


createRoot(document.getElementById("root")).render(

    <StrictMode>

        <ThemeProvider>

            <Provider store={store}>

                <BrowserRouter>

                    <SidebarProvider>

                        <App />

                    </SidebarProvider>

                </BrowserRouter>

            </Provider>


            <Toaster
                position="top-right"
                reverseOrder={false}
                toastOptions={{
                    duration: 3000,

                    style: {
                        background: "#0f172a",
                        color: "#fff",
                        border: "1px solid #334155",
                        borderRadius: "14px",
                    },

                    success: {
                        iconTheme: {
                            primary: "#22c55e",
                            secondary: "#fff",
                        },
                    },

                    error: {
                        iconTheme: {
                            primary: "#ef4444",
                            secondary: "#fff",
                        },
                    },
                }}
            />

        </ThemeProvider>

    </StrictMode>

);