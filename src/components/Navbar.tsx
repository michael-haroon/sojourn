
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { 
  Home,
  Calendar,
  User,
  Menu,
  X,
  LogIn
} from "lucide-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  // This would be replaced with actual authentication logic
  const isLoggedIn = false;

  return (
    <nav className="sticky top-0 z-50 w-full bg-background/80 blur-backdrop border-b">
      <div className="container mx-auto flex items-center justify-between h-16 px-2 md:px-4">
        <Link to="/" className="flex items-center space-x-2">
          <div className="h-8 w-8 rounded-full bg-gradient-to-br from-ocean-500 to-forest-500 flex items-center justify-center">
            <span className="text-white font-bold">SJ</span>
          </div>
          <span className="font-bold text-xl hidden sm:inline-block">
            Sojourn
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-6">
          <Link to="/" className="flex items-center space-x-1 text-foreground/80 hover:text-primary transition-colors">
            <Home size={18} />
            <span>Home</span>
          </Link>
          <Link to="/trips" className="flex items-center space-x-1 text-foreground/80 hover:text-primary transition-colors">
            <Calendar size={18} />
            <span>My Trips</span>
          </Link>
          <Link to="/account" className="flex items-center space-x-1 text-foreground/80 hover:text-primary transition-colors">
            <User size={18} />
            <span>Account</span>
          </Link>
          
          {isLoggedIn ? (
            <Button variant="outline" className="ml-2">
              <User size={16} className="mr-2" /> Profile
            </Button>
          ) : (
            <Button className="ml-2 bg-gradient-to-r from-ocean-500 to-forest-500 hover:opacity-90">
              <LogIn size={16} className="mr-2" /> Login
            </Button>
          )}
        </div>

        {/* Mobile menu button */}
        <button 
          className="md:hidden p-2 rounded-md hover:bg-muted"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Nav */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-40 bg-background md:hidden pt-16">
          <div className="flex flex-col p-4 space-y-4">
            <Link 
              to="/" 
              className="flex items-center space-x-2 p-3 rounded-md hover:bg-muted"
              onClick={() => setIsMenuOpen(false)}
            >
              <Home size={20} />
              <span>Home</span>
            </Link>
            <Link 
              to="/trips" 
              className="flex items-center space-x-2 p-3 rounded-md hover:bg-muted"
              onClick={() => setIsMenuOpen(false)}
            >
              <Calendar size={20} />
              <span>My Trips</span>
            </Link>
            <Link 
              to="/account" 
              className="flex items-center space-x-2 p-3 rounded-md hover:bg-muted"
              onClick={() => setIsMenuOpen(false)}
            >
              <User size={20} />
              <span>Account</span>
            </Link>
            
            <div className="pt-4 border-t">
              {isLoggedIn ? (
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <User size={18} className="mr-2" /> Profile
                </Button>
              ) : (
                <Button 
                  className="w-full justify-start bg-gradient-to-r from-ocean-500 to-forest-500 hover:opacity-90"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <LogIn size={18} className="mr-2" /> Login
                </Button>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
