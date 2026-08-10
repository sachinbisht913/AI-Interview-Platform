// File: src/context/SidebarContext.jsx

import { createContext, useContext, useState } from "react";

const SidebarContext = createContext();

export function SidebarProvider({ children }) {
    const [collapsed, setCollapsed] = useState(false);

    const [mobileOpen, setMobileOpen] = useState(false);

    const toggleSidebar = () => {
        setCollapsed((prev) => !prev);
    };

    const openMobileSidebar = () => {
        setMobileOpen(true);
    };

    const closeMobileSidebar = () => {
        setMobileOpen(false);
    };

    const toggleMobileSidebar = () => {
        setMobileOpen((prev) => !prev);
    };

    return (
        <SidebarContext.Provider
            value={{
                collapsed,
                toggleSidebar,

                mobileOpen,
                openMobileSidebar,
                closeMobileSidebar,
                toggleMobileSidebar,
            }}
        >
            {children}
        </SidebarContext.Provider>
    );
}

export const useSidebar = () => useContext(SidebarContext);