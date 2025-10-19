import { Menu, X, ShoppingCart, Phone, User, LogOut, Shield } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

interface HeaderProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

export function Header({ currentPage, onNavigate }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { getCartCount } = useCart();
  const { user, logout, orders } = useAuth();
  const cartCount = getCartCount();
  const pendingOrdersCount = user?.role === "admin" ? orders.filter(o => o.status === "pending").length : 0;

  const handleNavigate = (page: string) => {
    onNavigate(page);
    setIsMenuOpen(false);
    window.scrollTo(0, 0);
  };

  const handleLogout = () => {
    logout();
    handleNavigate("home");
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <button
            onClick={() => handleNavigate("home")}
            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
          >
            <div className="bg-green-600 text-white p-2 rounded-lg">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="currentColor"/>
                <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="text-green-700">Gaav Se Ghar tak</span>
              <span className="text-xs text-gray-500 hidden sm:block">गाव से घर तक</span>
            </div>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <button
              onClick={() => handleNavigate("home")}
              className={`transition-colors ${
                currentPage === "home" ? "text-green-600" : "text-gray-700 hover:text-green-600"
              }`}
            >
              Home
            </button>
            <button
              onClick={() => handleNavigate("shop")}
              className={`transition-colors ${
                currentPage === "shop" ? "text-green-600" : "text-gray-700 hover:text-green-600"
              }`}
            >
              Shop
            </button>
            <button
              onClick={() => handleNavigate("about")}
              className={`transition-colors ${
                currentPage === "about" ? "text-green-600" : "text-gray-700 hover:text-green-600"
              }`}
            >
              About
            </button>
            <button
              onClick={() => handleNavigate("contact")}
              className={`transition-colors ${
                currentPage === "contact" ? "text-green-600" : "text-gray-700 hover:text-green-600"
              }`}
            >
              Contact
            </button>
          </nav>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              className="gap-2"
              onClick={() => handleNavigate("contact")}
            >
              <Phone className="w-4 h-4" />
              Call Us
            </Button>
            <Button
              size="sm"
              className="gap-2 bg-green-600 hover:bg-green-700 relative"
              onClick={() => handleNavigate("cart")}
            >
              <ShoppingCart className="w-4 h-4" />
              Cart
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Button>
            
            {/* User Menu */}
            {user ? (
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-2 relative"
                  onClick={() => handleNavigate(user.role === "admin" ? "admin" : "profile")}
                  title={user.role === "admin" ? "Go to Admin Dashboard" : "Go to Profile"}
                >
                  {user.role === "admin" ? (
                    <Shield className="w-4 h-4" />
                  ) : (
                    <User className="w-4 h-4" />
                  )}
                  {user.name}
                  {user.role === "admin" && pendingOrdersCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                      {pendingOrdersCount}
                    </span>
                  )}
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="gap-2 text-red-600 hover:text-red-700 hover:bg-red-50"
                  onClick={handleLogout}
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </Button>
              </div>
            ) : (
              <>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleNavigate("login")}
                >
                  Login
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleNavigate("register")}
                >
                  Register
                </Button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 relative"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X /> : <Menu />}
            {cartCount > 0 && (
              <span className="absolute top-0 right-0 bg-red-500 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <nav className="md:hidden py-4 border-t">
            <div className="flex flex-col gap-4">
              <button
                onClick={() => handleNavigate("home")}
                className={`text-left py-2 transition-colors ${
                  currentPage === "home" ? "text-green-600" : "text-gray-700 hover:text-green-600"
                }`}
              >
                Home
              </button>
              <button
                onClick={() => handleNavigate("shop")}
                className={`text-left py-2 transition-colors ${
                  currentPage === "shop" ? "text-green-600" : "text-gray-700 hover:text-green-600"
                }`}
              >
                Shop
              </button>
              <button
                onClick={() => handleNavigate("about")}
                className={`text-left py-2 transition-colors ${
                  currentPage === "about" ? "text-green-600" : "text-gray-700 hover:text-green-600"
                }`}
              >
                About
              </button>
              <button
                onClick={() => handleNavigate("contact")}
                className={`text-left py-2 transition-colors ${
                  currentPage === "contact" ? "text-green-600" : "text-gray-700 hover:text-green-600"
                }`}
              >
                Contact
              </button>
              <div className="flex flex-col gap-2 pt-4 border-t">
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-2 justify-start"
                  onClick={() => handleNavigate("contact")}
                >
                  <Phone className="w-4 h-4" />
                  Call Us
                </Button>
                <Button
                  size="sm"
                  className="gap-2 bg-green-600 hover:bg-green-700 justify-start relative"
                  onClick={() => handleNavigate("cart")}
                >
                  <ShoppingCart className="w-4 h-4" />
                  Cart
                  {cartCount > 0 && (
                    <span className="ml-auto bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                      {cartCount}
                    </span>
                  )}
                </Button>
                
                {/* Mobile User Menu */}
                {user ? (
                  <>
                    <Button
                      variant="outline"
                      size="sm"
                      className="gap-2 justify-start relative"
                      onClick={() => handleNavigate(user.role === "admin" ? "admin" : "profile")}
                    >
                      {user.role === "admin" ? (
                        <>
                          <Shield className="w-4 h-4" />
                          Admin Panel ({user.name})
                          {pendingOrdersCount > 0 && (
                            <span className="ml-auto bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                              {pendingOrdersCount}
                            </span>
                          )}
                        </>
                      ) : (
                        <>
                          <User className="w-4 h-4" />
                          Profile ({user.name})
                        </>
                      )}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="gap-2 justify-start text-red-600 border-red-300 hover:bg-red-50"
                      onClick={handleLogout}
                    >
                      <LogOut className="w-4 h-4" />
                      Logout
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      variant="outline"
                      size="sm"
                      className="gap-2 justify-start"
                      onClick={() => handleNavigate("login")}
                    >
                      <User className="w-4 h-4" />
                      Login
                    </Button>
                    <Button
                      size="sm"
                      className="gap-2 bg-green-600 hover:bg-green-700 justify-start"
                      onClick={() => handleNavigate("register")}
                    >
                      Register
                    </Button>
                  </>
                )}
              </div>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
