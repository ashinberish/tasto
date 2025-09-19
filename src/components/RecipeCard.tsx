import {
  Heart,
  MessageCircle,
  Bookmark,
  Share,
  Clock,
  Users,
} from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Avatar } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Recipe } from "../types/recipe";

interface RecipeCardProps {
  recipe: Recipe;
  onLike: (id: string) => void;
  onSave: (id: string) => void;
  onComment: (id: string) => void;
  onViewRecipe: (recipe: Recipe) => void;
}

export function RecipeCard({
  recipe,
  onLike,
  onSave,
  onComment,
  onViewRecipe,
}: RecipeCardProps) {
  return (
    <Card
      style={{ maxHeight: "650px" }}
      className="w-full max-w-md mx-auto bg-card border border-border rounded-lg overflow-hidden"
    >
      {/* Header */}
      <div className="flex items-center gap-3 px-4 py-3">
        <Avatar className="w-10 h-10">
          <ImageWithFallback
            src={recipe.author.avatar}
            alt={recipe.author.name}
            className="w-full h-full object-cover"
            width={40}
            height={40}
          />
        </Avatar>
        <div className="flex-1">
          <p className="font-medium text-foreground">{recipe.author.name}</p>
          <p className="text-muted-foreground">@{recipe.author.username}</p>
        </div>
        <Button variant="ghost" size="sm">
          <Share className="w-4 h-4" />
        </Button>
      </div>

      {/* Recipe Image */}
      <div
        className="relative aspect-square overflow-hidden cursor-pointer"
        onClick={() => onViewRecipe(recipe)}
      >
        <ImageWithFallback
          src={recipe.image}
          alt={recipe.title}
          className="w-full h-full object-cover"
          fill={true}
        />
        <div className="absolute top-3 left-3">
          <Badge className="bg-black/50 text-white border-none">
            {recipe.difficulty}
          </Badge>
        </div>
        <div className="absolute inset-0 bg-black/0 hover:bg-black/20 transition-colors flex items-center justify-center">
          <Button
            className="opacity-0 hover:opacity-100 transition-opacity"
            size="sm"
          >
            View Recipe
          </Button>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onLike(recipe.id)}
            className={recipe.isLiked ? "text-red-500" : "text-foreground"}
          >
            <Heart
              className={`w-5 h-5 ${recipe.isLiked ? "fill-current" : ""}`}
            />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onComment(recipe.id)}
          >
            <MessageCircle className="w-5 h-5" />
          </Button>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onSave(recipe.id)}
          className={recipe.isSaved ? "text-primary" : "text-foreground"}
        >
          <Bookmark
            className={`w-5 h-5 ${recipe.isSaved ? "fill-current" : ""}`}
          />
        </Button>
      </div>

      {/* Recipe Info */}
      <div className="px-4 pb-4">
        <div className="flex items-center gap-4 mb-2 text-muted-foreground">
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>{recipe.cookTime}</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="w-4 h-4" />
            <span>{recipe.servings} servings</span>
          </div>
        </div>

        <h3 className="font-medium text-foreground mb-1">{recipe.title}</h3>
        <p className="text-muted-foreground mb-2 line-clamp-2">
          {recipe.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1 mb-2">
          {recipe.tags.map((tag, index) => (
            <Badge key={index} variant="secondary" className="text-xs">
              #{tag}
            </Badge>
          ))}
        </div>

        {/* Stats */}
        <div className="flex items-center gap-3 text-muted-foreground">
          <span>{recipe.likes} likes</span>
          <span>{recipe.comments} comments</span>
        </div>
      </div>
    </Card>
  );
}
