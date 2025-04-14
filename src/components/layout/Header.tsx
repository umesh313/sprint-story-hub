
import { Moon, Sun } from "lucide-react";
import { useTheme } from "../../contexts/ThemeContext";
import { Button } from "../ui/button";

const Header = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="bg-background border-b border-border h-16 flex items-center justify-between px-4 md:px-6">
      <div className="flex items-center">
        <h1 className="text-xl font-bold text-primary hidden md:block">Project Management Dashboard</h1>
        <h1 className="text-xl font-bold text-primary md:hidden">PM Dashboard</h1>
      </div>
      
      <div className="flex items-center space-x-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleTheme}
          aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
        >
          {theme === "light" ? (
            <Moon className="h-5 w-5" />
          ) : (
            <Sun className="h-5 w-5" />
          )}
        </Button>
      </div>
    </header>
  );
};

export default Header;
