import { useState } from "react";
import { RecipeFeed } from "./RecipeFeed";
import { RecipeSidebar } from "./RecipeSidebar";

export default function RecipeFeedWrapper() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  function handleCategoryChange(category: string) {
    setSelectedCategory(category);
  }
  return (
    <>
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex gap-6">
          {/* Sidebar */}
          <aside className="hidden lg:block flex-shrink-0">
            <RecipeSidebar
              selectedCategory={selectedCategory}
              onCategoryChange={handleCategoryChange}
            />
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-foreground mb-2">
                {selectedCategory === "all"
                  ? "Discover Recipes"
                  : `${
                      selectedCategory.charAt(0).toUpperCase() +
                      selectedCategory.slice(1)
                    } Recipes`}
              </h2>
              <p className="text-muted-foreground">
                {searchQuery
                  ? `Showing results for "${searchQuery}"`
                  : "Explore delicious recipes shared by our community"}
              </p>
            </div>
            <RecipeFeed
              selectedCategory="all"
              searchQuery=""
              onAddRecipe={() => {}}
              onViewRecipe={() => {}}
            />
          </main>
        </div>
      </div>
    </>
  );
}
