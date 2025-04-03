
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

interface HeaderProps {
  toggleSidebar: () => void;
  toggleDarkMode: () => void;
  isDarkMode: boolean;
}

const Header: React.FC<HeaderProps> = ({ toggleSidebar, toggleDarkMode, isDarkMode }) => {
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleCrisisHelp = () => {
    window.location.href = 'tel:+919999666555';
    toast({
      title: "Crisis Support",
      description: "Connecting you to the national mental health helpline.",
    });
  };

  return (
    <header className="bg-white dark:bg-charcoal shadow-sm p-3 md:p-4 flex justify-between items-center transition-colors duration-300">
      <div className="flex items-center gap-2 md:gap-3">
        <Button 
          id="menu-button"
          variant="ghost" 
          size="icon" 
          onClick={toggleSidebar} 
          className="md:hidden"
        >
          <Menu className="h-5 w-5 md:h-6 md:w-6" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
        <h1 
          className="text-lg md:text-xl font-poppins font-semibold text-sage cursor-pointer"
          onClick={() => navigate('/')}
        >
          MindfulSpace
        </h1>
      </div>
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleDarkMode}
          className="text-muted-foreground"
        >
          {isDarkMode ? (
            <Sun className="h-4 w-4 md:h-5 md:w-5" />
          ) : (
            <Moon className="h-4 w-4 md:h-5 md:w-5" />
          )}
          <span className="sr-only">Toggle Dark Mode</span>
        </Button>
        <Button 
          variant="outline" 
          className="text-sage hover:text-white hover:bg-sage text-xs md:text-sm py-1 px-2 md:py-2 md:px-3 hidden sm:inline-flex"
          onClick={handleCrisisHelp}
        >
          Get Help Now
        </Button>
      </div>
    </header>
  );
};

export default Header;
