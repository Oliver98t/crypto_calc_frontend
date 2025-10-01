import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import { HeroUIProvider } from "@heroui/system";
import "@/styles/globals.css";

const rootElement = document.getElementById("root");
if (rootElement) {
    ReactDOM.createRoot(rootElement).render(
        <React.StrictMode>
            <BrowserRouter>
                <HeroUIProvider>
                    <App />
                </HeroUIProvider>
            </BrowserRouter>
        </React.StrictMode>,
    );
}
