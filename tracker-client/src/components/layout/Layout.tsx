import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AppSidebar from "./sidebar";
import AppFooter from "./footer";

type LayoutProps = {
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    const navigate = useNavigate();
    const [sidebarOpen, setSidebarOpen] = useState(true);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 768) {
                setSidebarOpen(false);
            } else {
                setSidebarOpen(true);
            }
        }
        handleResize();

        window.addEventListener("resize", handleResize);

        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <div className="flex h-[calc(100vh-57px)]">
            <div className="h-full flex-shrink-0">
                <AppSidebar sidebarOpen={sidebarOpen} updateSidebarOpen={setSidebarOpen} navigate={navigate} />
            </div>
            <div className="flex flex-col flex-1 min-h-0">
                {sidebarOpen && (
                    <div className="fixed inset-0 z-20 bg-black/50 md:hidden" onClick={() => setSidebarOpen(false)} />
                )}
                <div className="content flex-1 overflow-y-auto p-4">
                    {children}
                </div>
                <div className="shrink-0">
                    <AppFooter />
                </div>
            </div>
        </div>
    )
}

export default Layout;