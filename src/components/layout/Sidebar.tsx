import { BarChart, Calendar, ChartGantt, FolderKanban, Home, Settings } from "lucide-react";
import { cn } from "@/lib/utils";
import { Link, useLocation } from "react-router-dom";
const navItems = [{
  icon: Home,
  label: "Dashboard",
  path: "/"
}, {
  icon: FolderKanban,
  label: "Kanban Board",
  path: "/kanban"
}, {
  icon: Calendar,
  label: "Calendar",
  path: "/calendar"
}, {
  icon: ChartGantt,
  label: "Timeline",
  path: "/timeline"
}, {
  icon: BarChart,
  label: "Analytics",
  path: "/analytics"
}, {
  icon: Settings,
  label: "Settings",
  path: "/settings"
}];
const Sidebar = () => {
  const location = useLocation();
  return <aside className="bg-sidebar w-16 lg:w-64 border-r border-sidebar-border flex flex-col h-screen fixed left-0 top-0">
      <div className="p-4 border-b border-sidebar-border flex justify-center lg:justify-start items-center">
        <div className="h-8 w-8 bg-primary rounded-md flex items-center justify-center">
          <span className="text-white font-bold text-lg">PM</span>
        </div>
        <span className="ml-2 text-sidebar-foreground font-bold hidden lg:block">Project Master</span>
      </div>
      
      <nav className="mt-6 px-2 flex-1">
        <ul className="space-y-2">
          {navItems.map(item => {
          const isActive = location.pathname === item.path;
          return <li key={item.path}>
                <Link to={item.path} className={cn("flex items-center p-2 rounded-md text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors", isActive && "bg-primary/10 text-primary")}>
                  <item.icon className="h-5 w-5" />
                  <span className="ml-3 hidden lg:block text-base text-left mx-[10px]">{item.label}</span>
                </Link>
              </li>;
        })}
        </ul>
      </nav>
      
      <div className="p-4 border-t border-sidebar-border mt-auto">
        <div className="flex items-center">
          <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center">
            <span className="text-primary font-bold">JD</span>
          </div>
          <div className="ml-2 hidden lg:block">
            <div className="text-sm font-medium text-sidebar-foreground">John Doe</div>
            <div className="text-xs text-muted-foreground">Project Manager</div>
          </div>
        </div>
      </div>
    </aside>;
};
export default Sidebar;