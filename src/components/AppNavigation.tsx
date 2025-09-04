"use client";
import { Search, Plus, Home, Bookmark, User, Bell } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Avatar } from "./ui/avatar";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface AppNavigationProps {
  currentUser: {
    name: string;
    avatar: string;
  };
  onSearch: (query: string) => void;
  onNewRecipe: () => void;
}

export function AppNavigation({
  currentUser,
  onSearch,
  onNewRecipe,
}: AppNavigationProps) {
  return (
    <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur border-b border-border">
      <div className="max-w-6xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-primary">Tasto</h1>
          </div>

          {/* Search */}
          <div className="flex-1 max-w-md mx-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search recipes, users, or ingredients..."
                className="pl-10 bg-input-background border-border"
                onChange={(e) => onSearch(e.target.value)}
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm">
              <Home className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="sm">
              <Bookmark className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="sm">
              <Bell className="w-5 h-5" />
            </Button>
            <Button
              onClick={onNewRecipe}
              size="sm"
              className="bg-primary text-primary-foreground hover:bg-primary/90"
            >
              <Plus className="w-4 h-4 mr-1" />
              Recipe
            </Button>
            <Avatar className="w-8 h-8 ml-2">
              <ImageWithFallback
                src={currentUser.avatar}
                alt={currentUser.name}
                className="w-full h-full object-cover"
              />
            </Avatar>
          </div>
        </div>
      </div>
    </nav>
  );
}
