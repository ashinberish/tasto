import { useState } from "react";
import { RecipeCard } from "./RecipeCard";
import { Recipe } from "../types/recipe";
import { mockRecipes } from "../data/mockRecipes";
import { filterRecipes } from "../utils/recipeUtils";

interface RecipeFeedProps {
  selectedCategory: string;
  searchQuery: string;
  onViewRecipe: (recipe: Recipe) => void;
  onAddRecipe: (recipe: Recipe) => void;
}

export function RecipeFeed({
  selectedCategory,
  searchQuery,
  onViewRecipe,
  onAddRecipe,
}: RecipeFeedProps) {
  const [recipes, setRecipes] = useState<Recipe[]>(mockRecipes);

  // Function to add new recipe to the feed
  const addRecipeToFeed = (newRecipe: Recipe) => {
    setRecipes((prev) => [newRecipe, ...prev]);
    onAddRecipe(newRecipe);
  };

  const filteredRecipes = filterRecipes(recipes, selectedCategory, searchQuery);

  const handleLike = (recipeId: string) => {
    setRecipes((prev) =>
      prev.map((recipe) =>
        recipe.id === recipeId
          ? {
              ...recipe,
              isLiked: !recipe.isLiked,
              likes: recipe.isLiked ? recipe.likes - 1 : recipe.likes + 1,
            }
          : recipe
      )
    );
  };

  const handleSave = (recipeId: string) => {
    setRecipes((prev) =>
      prev.map((recipe) =>
        recipe.id === recipeId
          ? { ...recipe, isSaved: !recipe.isSaved }
          : recipe
      )
    );
  };

  const handleComment = (recipeId: string) => {
    // In a real app, this would open a comment modal or navigate to recipe detail
    console.log("Opening comments for recipe:", recipeId);
  };

  return (
    <div className="space-y-6">
      {filteredRecipes.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">
            No recipes found matching your criteria.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredRecipes.map((recipe) => (
            <RecipeCard
              key={recipe.id}
              recipe={recipe}
              onLike={handleLike}
              onSave={handleSave}
              onComment={handleComment}
              onViewRecipe={onViewRecipe}
            />
          ))}
        </div>
      )}
    </div>
  );
}
