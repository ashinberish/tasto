import { Recipe } from "../types/recipe";

export const mockRecipes: Recipe[] = [
  {
    id: "1",
    title: "Creamy Garlic Parmesan Pasta",
    description: "A rich and creamy pasta dish with fresh garlic, parmesan cheese, and herbs. Perfect for a cozy dinner at home.",
    image: "https://images.unsplash.com/photo-1711539137930-3fa2ae6cec60?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZWxpY2lvdXMlMjBwYXN0YSUyMGRpc2h8ZW58MXx8fHwxNzU2NDc4OTE0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    prepTime: "10 min",
    cookTime: "25 min",
    servings: 4,
    difficulty: "Easy",
    likes: 247,
    comments: 32,
    isLiked: false,
    isSaved: false,
    author: {
      name: "Maria Rodriguez",
      avatar: "https://images.unsplash.com/photo-1581065178026-390bc4e78dad?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBwb3J0cmFpdCUyMHdvbWFufGVufDF8fHx8MTc1NjU0MDI2Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      username: "mariachef"
    },
    tags: ["pasta", "italian", "comfort-food", "vegetarian"],
    category: "dinner",
    ingredients: [
      { id: "ing1", name: "Fettuccine pasta", amount: "1", unit: "lb" },
      { id: "ing2", name: "Heavy cream", amount: "1", unit: "cup" },
      { id: "ing3", name: "Garlic cloves", amount: "4", unit: "cloves" },
      { id: "ing4", name: "Parmesan cheese", amount: "1", unit: "cup" },
      { id: "ing5", name: "Butter", amount: "3", unit: "tbsp" },
      { id: "ing6", name: "Fresh parsley", amount: "2", unit: "tbsp" }
    ],
    steps: [
      {
        id: "step1",
        stepNumber: 1,
        title: "Cook the pasta",
        instruction: "Bring a large pot of salted water to boil. Add fettuccine and cook according to package directions until al dente.",
        timer: { minutes: 10, seconds: 0, label: "Pasta cooking" },
        ingredientsNeeded: ["ing1"]
      },
      {
        id: "step2",
        stepNumber: 2,
        title: "Prepare the sauce",
        instruction: "While pasta cooks, melt butter in a large skillet over medium heat. Add minced garlic and sauté until fragrant, about 1 minute.",
        timer: { minutes: 2, seconds: 0, label: "Sauté garlic" },
        ingredientsNeeded: ["ing5", "ing3"]
      },
      {
        id: "step3",
        stepNumber: 3,
        title: "Add cream",
        instruction: "Pour in heavy cream and bring to a gentle simmer. Let it simmer for 2-3 minutes to thicken slightly.",
        timer: { minutes: 3, seconds: 0, label: "Simmer cream" },
        ingredientsNeeded: ["ing2"]
      },
      {
        id: "step4",
        stepNumber: 4,
        title: "Finish the dish",
        instruction: "Drain pasta and add to the cream sauce. Toss with grated Parmesan cheese and fresh parsley. Season with salt and pepper to taste.",
        ingredientsNeeded: ["ing4", "ing6"]
      }
    ],
    notes: "For best results, use freshly grated Parmesan cheese. Save some pasta water to adjust sauce consistency if needed."
  },
  {
    id: "2",
    title: "Decadent Chocolate Lava Cake",
    description: "Individual chocolate cakes with a molten center. Serve warm with vanilla ice cream for the ultimate dessert experience.",
    image: "https://images.unsplash.com/photo-1644158776192-2d24ce35da1d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaG9jb2xhdGUlMjBjYWtlJTIwZGVzc2VydHxlbnwxfHx8fDE3NTY1NDQ0Nzh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    prepTime: "15 min",
    cookTime: "30 min",
    servings: 2,
    difficulty: "Medium",
    likes: 189,
    comments: 24,
    isLiked: true,
    isSaved: true,
    author: {
      name: "Chef Antoine",
      avatar: "https://images.unsplash.com/photo-1683702831004-97203ddc564e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGVmJTIwcG9ydHJhaXQlMjBjb29raW5nfGVufDF8fHx8MTc1NjU3MTc4NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      username: "chef_antoine"
    },
    tags: ["chocolate", "dessert", "french", "indulgent"],
    category: "dessert",
    ingredients: [
      { id: "ing7", name: "Dark chocolate", amount: "4", unit: "oz" },
      { id: "ing8", name: "Butter", amount: "4", unit: "tbsp" },
      { id: "ing9", name: "Eggs", amount: "2", unit: "large" },
      { id: "ing10", name: "Sugar", amount: "1/4", unit: "cup" },
      { id: "ing11", name: "All-purpose flour", amount: "2", unit: "tbsp" },
      { id: "ing12", name: "Vanilla extract", amount: "1/2", unit: "tsp" }
    ],
    steps: [
      {
        id: "step5",
        stepNumber: 1,
        title: "Prep ramekins",
        instruction: "Preheat oven to 425°F. Butter two 6-oz ramekins and dust with cocoa powder.",
        ingredientsNeeded: []
      },
      {
        id: "step6",
        stepNumber: 2,
        title: "Melt chocolate",
        instruction: "In a microwave-safe bowl, melt chocolate and butter together in 30-second intervals, stirring between each until smooth.",
        timer: { minutes: 2, seconds: 0, label: "Melt chocolate" },
        ingredientsNeeded: ["ing7", "ing8"]
      },
      {
        id: "step7",
        stepNumber: 3,
        title: "Mix batter",
        instruction: "Whisk in eggs, sugar, vanilla, and flour until just combined. Don't overmix.",
        ingredientsNeeded: ["ing9", "ing10", "ing11", "ing12"]
      },
      {
        id: "step8",
        stepNumber: 4,
        title: "Bake",
        instruction: "Divide batter between ramekins. Bake for 12-14 minutes until edges are set but center still jiggles slightly.",
        timer: { minutes: 14, seconds: 0, label: "Baking time" },
        ingredientsNeeded: []
      }
    ],
    notes: "Serve immediately while the center is still molten. Can be made ahead and refrigerated, then baked when ready to serve."
  },
  {
    id: "3",
    title: "Rainbow Buddha Bowl",
    description: "A nutritious and colorful bowl packed with fresh vegetables, quinoa, and a tahini dressing. Perfect for a healthy lunch.",
    image: "https://images.unsplash.com/photo-1620019989479-d52fcedd99fe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMHNhbGFkJTIwYm93bHxlbnwxfHx8fDE3NTY1MjI5NDF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    prepTime: "10 min",
    cookTime: "15 min",
    servings: 2,
    difficulty: "Easy",
    likes: 156,
    comments: 18,
    isLiked: false,
    isSaved: false,
    author: {
      name: "Sarah Green",
      avatar: "https://images.unsplash.com/photo-1581065178026-390bc4e78dad?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBwb3J0cmFpdCUyMHdvbWFufGVufDF8fHx8MTc1NjU0MDI2Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      username: "sarahgreen"
    },
    tags: ["healthy", "vegan", "colorful", "quinoa"],
    category: "lunch",
    ingredients: [
      { id: "ing13", name: "Quinoa", amount: "1", unit: "cup" },
      { id: "ing14", name: "Red cabbage", amount: "1", unit: "cup" },
      { id: "ing15", name: "Carrots", amount: "2", unit: "medium" },
      { id: "ing16", name: "Chickpeas", amount: "1", unit: "can" },
      { id: "ing17", name: "Tahini", amount: "3", unit: "tbsp" },
      { id: "ing18", name: "Lemon juice", amount: "2", unit: "tbsp" }
    ],
    steps: [
      {
        id: "step9",
        stepNumber: 1,
        title: "Cook quinoa",
        instruction: "Rinse quinoa and cook in 2 cups water. Bring to boil, then simmer covered for 15 minutes.",
        timer: { minutes: 15, seconds: 0, label: "Quinoa cooking" },
        ingredientsNeeded: ["ing13"]
      },
      {
        id: "step10",
        stepNumber: 2,
        title: "Prep vegetables",
        instruction: "While quinoa cooks, julienne carrots, thinly slice red cabbage, and drain chickpeas.",
        ingredientsNeeded: ["ing14", "ing15", "ing16"]
      },
      {
        id: "step11",
        stepNumber: 3,
        title: "Make dressing",
        instruction: "Whisk together tahini, lemon juice, and 2-3 tbsp water until smooth. Season with salt.",
        ingredientsNeeded: ["ing17", "ing18"]
      },
      {
        id: "step12",
        stepNumber: 4,
        title: "Assemble bowls",
        instruction: "Divide quinoa between bowls. Top with vegetables and chickpeas. Drizzle with tahini dressing.",
        ingredientsNeeded: []
      }
    ],
    notes: "Feel free to add any other colorful vegetables you have on hand!"
  },
  {
    id: "4",
    title: "Herb-Crusted Salmon",
    description: "Perfectly grilled salmon with a fresh herb crust. Light, flaky, and full of omega-3s for a heart-healthy dinner.",
    image: "https://images.unsplash.com/photo-1720514091975-a322721f0dc3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncmlsbGVkJTIwc2FsbW9uJTIwZmlzaHxlbnwxfHx8fDE3NTY1ODAyMjF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    prepTime: "10 min",
    cookTime: "20 min",
    servings: 4,
    difficulty: "Medium",
    likes: 298,
    comments: 41,
    isLiked: true,
    isSaved: false,
    author: {
      name: "James Cooper",
      avatar: "https://images.unsplash.com/photo-1672685667592-0392f458f46f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBwb3J0cmFpdCUyMG1hbnxlbnwxfHx8fDE3NTY0NjA0MzZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      username: "jamescooper"
    },
    tags: ["salmon", "healthy", "protein", "herbs"],
    category: "dinner",
    ingredients: [
      { id: "ing19", name: "Salmon fillets", amount: "4", unit: "6oz" },
      { id: "ing20", name: "Fresh dill", amount: "2", unit: "tbsp" },
      { id: "ing21", name: "Fresh parsley", amount: "2", unit: "tbsp" },
      { id: "ing22", name: "Breadcrumbs", amount: "1/2", unit: "cup" },
      { id: "ing23", name: "Olive oil", amount: "2", unit: "tbsp" },
      { id: "ing24", name: "Lemon", amount: "1", unit: "whole" }
    ],
    steps: [
      {
        id: "step13",
        stepNumber: 1,
        title: "Preheat and prep",
        instruction: "Preheat oven to 400°F. Line a baking sheet with parchment paper.",
        ingredientsNeeded: []
      },
      {
        id: "step14",
        stepNumber: 2,
        title: "Make herb crust",
        instruction: "Mix chopped herbs, breadcrumbs, olive oil, and lemon zest in a bowl.",
        ingredientsNeeded: ["ing20", "ing21", "ing22", "ing23", "ing24"]
      },
      {
        id: "step15",
        stepNumber: 3,
        title: "Season salmon",
        instruction: "Pat salmon dry and season with salt and pepper. Top with herb mixture.",
        ingredientsNeeded: ["ing19"]
      },
      {
        id: "step16",
        stepNumber: 4,
        title: "Bake",
        instruction: "Bake for 12-15 minutes until fish flakes easily with a fork.",
        timer: { minutes: 15, seconds: 0, label: "Baking salmon" },
        ingredientsNeeded: []
      }
    ],
    notes: "Internal temperature should reach 145°F. Serve with lemon wedges."
  },
  {
    id: "5",
    title: "Avocado Toast Supreme",
    description: "Elevated avocado toast with poached egg, everything bagel seasoning, and microgreens. The perfect breakfast or brunch.",
    image: "https://images.unsplash.com/photo-1676471970358-1cff04452e7b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhdm9jYWRvJTIwdG9hc3QlMjBicmVha2Zhc3R8ZW58MXx8fHwxNzU2NTczNjMwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    prepTime: "5 min",
    cookTime: "10 min",
    servings: 1,
    difficulty: "Easy",
    likes: 134,
    comments: 15,
    isLiked: false,
    isSaved: true,
    author: {
      name: "Emma Wilson",
      avatar: "https://images.unsplash.com/photo-1581065178026-390bc4e78dad?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBwb3J0cmFpdCUyMHdvbWFufGVufDF8fHx8MTc1NjU0MDI2Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      username: "emmawilson"
    },
    tags: ["avocado", "breakfast", "healthy", "quick"],
    category: "breakfast",
    ingredients: [
      { id: "ing25", name: "Sourdough bread", amount: "2", unit: "slices" },
      { id: "ing26", name: "Ripe avocado", amount: "1", unit: "whole" },
      { id: "ing27", name: "Eggs", amount: "2", unit: "large" },
      { id: "ing28", name: "Everything bagel seasoning", amount: "1", unit: "tsp" },
      { id: "ing29", name: "Microgreens", amount: "1", unit: "handful" },
      { id: "ing30", name: "Lemon juice", amount: "1", unit: "tsp" }
    ],
    steps: [
      {
        id: "step17",
        stepNumber: 1,
        title: "Poach eggs",
        instruction: "Bring water to simmer, create whirlpool, and drop in eggs. Cook for 3-4 minutes.",
        timer: { minutes: 4, seconds: 0, label: "Poaching eggs" },
        ingredientsNeeded: ["ing27"]
      },
      {
        id: "step18",
        stepNumber: 2,
        title: "Toast bread",
        instruction: "Toast sourdough slices until golden brown and crispy.",
        timer: { minutes: 2, seconds: 0, label: "Toasting bread" },
        ingredientsNeeded: ["ing25"]
      },
      {
        id: "step19",
        stepNumber: 3,
        title: "Prepare avocado",
        instruction: "Mash avocado with lemon juice, salt, and pepper.",
        ingredientsNeeded: ["ing26", "ing30"]
      },
      {
        id: "step20",
        stepNumber: 4,
        title: "Assemble",
        instruction: "Spread avocado on toast, top with poached egg, sprinkle with everything seasoning and microgreens.",
        ingredientsNeeded: ["ing28", "ing29"]
      }
    ],
    notes: "For perfect poached eggs, use the freshest eggs possible and add a splash of vinegar to the water."
  }
];