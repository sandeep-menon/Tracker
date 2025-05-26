import { Briefcase, ChevronLeft, ChevronRight, Clapperboard, LayoutDashboard } from "lucide-react";
import { Button } from "../ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";

interface AppSidebarProps {
    sidebarOpen: boolean;
    updateSidebarOpen: (open: boolean) => void;
    navigate: (path: string) => void;
}

function AppSidebar({ sidebarOpen, updateSidebarOpen, navigate }: AppSidebarProps) {
    const sidebarItems = [
        { name: "Dashboard", path: "/dashboard", icon: <LayoutDashboard className="h-4 w-4" /> },
        { name: "Projects", path: "/projects", icon: <Clapperboard className="h-4 w-4" /> },
        { name: "My Work", path: "/assigned", icon: <Briefcase className="h-4 w-4" /> },
    ];

    return (
        <aside
          className={`
            ${sidebarOpen ? 'w-64' : 'w-16'} 
            transition-all duration-300 ease-in-out
            border-r overflow-y-auto
            h-full md:sticky top-16 left-0 z-30
            bg-background md:bg-muted/40
          `}
        >
          <div className="flex flex-col h-full py-4">
            <div className={`flex ${sidebarOpen ? "justify-end" : "justify-center"} px-4 md:px-2`}>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => updateSidebarOpen(!sidebarOpen)}
                      className="hidden md:flex"
                    >
                      {sidebarOpen ?
                        <ChevronLeft className="h-4 w-4" /> :
                        <ChevronRight className="h-4 w-4" />
                      }
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="right">
                    <p>{sidebarOpen ? 'Collapse Sidebar' : 'Expand Sidebar'}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>

            {/* Sidebar content */}
            <nav className="flex-1 px-2 mt-4">
              <ul className="space-y-2">
                <TooltipProvider>
                  {sidebarItems.map((item) => {
                    const isActive = location.pathname === item.path;

                    return (
                      <li key={item.name}>
                        {sidebarOpen ? (
                          // Full sidebar button with icon + text
                          <Button
                            variant={isActive ? "default" : "ghost"}
                            className={`w-full justify-start gap-2 ${isActive ? "bg-primary text-white" : ""}`}
                            onClick={() => navigate(item.path)}
                          >
                            {item.icon}
                            <span>{item.name}</span>
                          </Button>
                        ) : (
                          // Collapsed sidebar button with just the icon
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button
                                  variant={isActive ? "default" : "ghost"}
                                  className={`w-full flex justify-center ${isActive ? "bg-primary text-white" : ""}`}
                                  onClick={() => navigate(item.path)}
                                >
                                  {item.icon}
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent side="right">
                                <p>{item.name}</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        )}
                      </li>
                    );
                  })}
                </TooltipProvider>
              </ul>
            </nav>
          </div>
        </aside>
    )
}

export default AppSidebar;