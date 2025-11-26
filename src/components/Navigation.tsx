import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Globe } from "lucide-react";

interface NavigationProps {
  showAuthButtons?: boolean;
}

export function Navigation({ showAuthButtons = false }: NavigationProps) {
  return (
    <header className="sticky top-0 z-50 backdrop-blur-lg bg-background/80 border-b border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl gradient-hero flex items-center justify-center">
              <Globe className="h-6 w-6 text-primary-foreground" />
            </div>
            <span className="text-2xl font-bold">BizTalk</span>
          </Link>
          
          <nav className="hidden md:flex items-center gap-6">
            <Link to="/courses" className="text-sm font-medium hover:text-primary transition-colors">Khóa học</Link>
            <Link to="/lessons" className="text-sm font-medium hover:text-primary transition-colors">Bài học</Link>
            <Link to="/vocabulary" className="text-sm font-medium hover:text-primary transition-colors">Từ vựng</Link>
            <Link to="/speech" className="text-sm font-medium hover:text-primary transition-colors">Phát âm</Link>
            <Link to="/ai-chatbot" className="text-sm font-medium hover:text-primary transition-colors">AI Chatbot</Link>
            <Link to="/dashboard" className="text-sm font-medium hover:text-primary transition-colors">Dashboard</Link>
          </nav>
          
          <div className="flex items-center gap-2">
            <ThemeToggle />
            {showAuthButtons && (
              <Link to="/placement-test">
                <Button>Bắt đầu</Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
