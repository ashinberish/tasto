import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";

interface RecipeSidebarProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

const categories = [
  { id: "all", name: "All Recipes", count: 1247 },
  { id: "breakfast", name: "Breakfast", count: 156 },
  { id: "lunch", name: "Lunch", count: 298 },
  { id: "dinner", name: "Dinner", count: 445 },
  { id: "dessert", name: "Dessert", count: 187 },
  { id: "snacks", name: "Snacks", count: 161 },
];

const popularTags = [
  "vegetarian", "vegan", "gluten-free", "keto", "healthy", 
  "quick", "comfort-food", "italian", "asian", "mediterranean"
];

const trending = [
  { name: "Air Fryer Recipes", posts: 234 },
  { name: "15-Minute Meals", posts: 189 },
  { name: "Meal Prep", posts: 156 },
  { name: "Sourdough Bread", posts: 98 },
];

export function RecipeSidebar({ selectedCategory, onCategoryChange }: RecipeSidebarProps) {
  return (
    <div className="w-64 space-y-4">
      {/* Categories */}
      <Card className="p-4">
        <h3 className="font-medium mb-3">Categories</h3>
        <div className="space-y-1">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? "secondary" : "ghost"}
              className="w-full justify-between text-left"
              onClick={() => onCategoryChange(category.id)}
            >
              <span>{category.name}</span>
              <Badge variant="outline" className="text-xs">
                {category.count}
              </Badge>
            </Button>
          ))}
        </div>
      </Card>

      {/* Popular Tags */}
      <Card className="p-4">
        <h3 className="font-medium mb-3">Popular Tags</h3>
        <div className="flex flex-wrap gap-2">
          {popularTags.map((tag) => (
            <Badge
              key={tag}
              variant="outline"
              className="cursor-pointer hover:bg-secondary"
            >
              #{tag}
            </Badge>
          ))}
        </div>
      </Card>

      {/* Trending */}
      <Card className="p-4">
        <h3 className="font-medium mb-3">Trending</h3>
        <div className="space-y-3">
          {trending.map((item, index) => (
            <div key={index} className="flex justify-between items-center">
              <div>
                <p className="font-medium">{item.name}</p>
                <p className="text-muted-foreground text-sm">{item.posts} posts</p>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}