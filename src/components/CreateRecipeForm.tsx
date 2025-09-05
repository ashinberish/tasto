import { useState } from "react";
import {
  Plus,
  X,
  Clock,
  ChefHat,
  Users,
  Timer,
  Image as ImageIcon,
} from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Separator } from "./ui/separator";
import { Recipe, Ingredient, RecipeStep } from "../types/recipe";

interface CreateRecipeFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (recipe: Recipe) => void;
  currentUser: {
    name: string;
    avatar: string;
    username: string;
  };
}

export function CreateRecipeForm({
  isOpen,
  onClose,
  onSave,
  currentUser,
}: CreateRecipeFormProps) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: "",
    prepTime: "",
    cookTime: "",
    servings: 4,
    difficulty: "Easy",
    category: "dinner",
    notes: "",
  });

  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [steps, setSteps] = useState<RecipeStep[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState("");

  const addIngredient = () => {
    const newIngredient: Ingredient = {
      id: `ingredient-${Date.now()}`,
      name: "",
      amount: "",
      unit: "",
    };
    setIngredients([...ingredients, newIngredient]);
  };

  const updateIngredient = (
    id: string,
    field: keyof Ingredient,
    value: string
  ) => {
    setIngredients(
      ingredients.map((ing) =>
        ing.id === id ? { ...ing, [field]: value } : ing
      )
    );
  };

  const removeIngredient = (id: string) => {
    setIngredients(ingredients.filter((ing) => ing.id !== id));
    // Also remove from steps
    setSteps(
      steps.map((step) => ({
        ...step,
        ingredientsNeeded: step.ingredientsNeeded.filter(
          (ingId) => ingId !== id
        ),
      }))
    );
  };

  const addStep = () => {
    const newStep: RecipeStep = {
      id: `step-${Date.now()}`,
      stepNumber: steps.length + 1,
      title: "",
      instruction: "",
      ingredientsNeeded: [],
    };
    setSteps([...steps, newStep]);
  };

  const updateStep = (id: string, field: keyof RecipeStep, value: unknown) => {
    setSteps(
      steps.map((step) => (step.id === id ? { ...step, [field]: value } : step))
    );
  };

  const removeStep = (id: string) => {
    const filteredSteps = steps.filter((step) => step.id !== id);
    // Renumber steps
    const renumberedSteps = filteredSteps.map((step, index) => ({
      ...step,
      stepNumber: index + 1,
    }));
    setSteps(renumberedSteps);
  };

  const addTimer = (stepId: string) => {
    updateStep(stepId, "timer", {
      minutes: 5,
      seconds: 0,
      label: "Timer",
    });
  };

  const removeTimer = (stepId: string) => {
    updateStep(stepId, "timer", undefined);
  };

  const addTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim().toLowerCase())) {
      setTags([...tags, newTag.trim().toLowerCase()]);
      setNewTag("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const handleSave = () => {
    const recipe: Recipe = {
      id: `recipe-${Date.now()}`,
      ...formData,
      author: {
        name: currentUser.name,
        avatar: currentUser.avatar,
        username: currentUser.username,
      },
      ingredients,
      steps,
      tags,
      likes: 0,
      comments: 0,
      isLiked: false,
      isSaved: false,
    };

    onSave(recipe);
    onClose();

    // Reset form
    setFormData({
      title: "",
      description: "",
      image: "",
      prepTime: "",
      cookTime: "",
      servings: 4,
      difficulty: "Easy",
      category: "dinner",
      notes: "",
    });
    setIngredients([]);
    setSteps([]);
    setTags([]);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <ChefHat className="w-5 h-5" />
            Create New Recipe
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Basic Information */}
          <Card className="p-4">
            <h3 className="mb-4">Basic Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="title">Recipe Title</Label>
                <Input
                  id="title"
                  placeholder="Enter recipe title..."
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="image">Recipe Image URL</Label>
                <Input
                  id="image"
                  placeholder="https://example.com/image.jpg"
                  value={formData.image}
                  onChange={(e) =>
                    setFormData({ ...formData, image: e.target.value })
                  }
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Describe your recipe..."
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select
                  value={formData.category}
                  onValueChange={(value: string) =>
                    setFormData({ ...formData, category: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="breakfast">Breakfast</SelectItem>
                    <SelectItem value="lunch">Lunch</SelectItem>
                    <SelectItem value="dinner">Dinner</SelectItem>
                    <SelectItem value="dessert">Dessert</SelectItem>
                    <SelectItem value="snacks">Snacks</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="difficulty">Difficulty</Label>
                <Select
                  value={formData.difficulty}
                  onValueChange={(value: string) =>
                    setFormData({ ...formData, difficulty: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Easy">Easy</SelectItem>
                    <SelectItem value="Medium">Medium</SelectItem>
                    <SelectItem value="Hard">Hard</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="prepTime">Prep Time</Label>
                <Input
                  id="prepTime"
                  placeholder="15 min"
                  value={formData.prepTime}
                  onChange={(e) =>
                    setFormData({ ...formData, prepTime: e.target.value })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="cookTime">Cook Time</Label>
                <Input
                  id="cookTime"
                  placeholder="30 min"
                  value={formData.cookTime}
                  onChange={(e) =>
                    setFormData({ ...formData, cookTime: e.target.value })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="servings">Servings</Label>
                <Input
                  id="servings"
                  type="number"
                  min="1"
                  value={formData.servings}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      servings: parseInt(e.target.value) || 1,
                    })
                  }
                />
              </div>
            </div>
          </Card>

          {/* Tags */}
          <Card className="p-4">
            <h3 className="mb-4">Tags</h3>
            <div className="space-y-3">
              <div className="flex gap-2">
                <Input
                  placeholder="Add a tag..."
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && addTag()}
                />
                <Button onClick={addTag} type="button">
                  Add
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <Badge
                    key={tag}
                    variant="secondary"
                    className="flex items-center gap-1"
                  >
                    #{tag}
                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-4 h-4 p-0"
                      onClick={() => removeTag(tag)}
                    >
                      <X className="w-3 h-3" />
                    </Button>
                  </Badge>
                ))}
              </div>
            </div>
          </Card>

          {/* Ingredients */}
          <Card className="p-4">
            <div className="flex items-center justify-between mb-4">
              <h3>Ingredients</h3>
              <Button onClick={addIngredient} size="sm">
                <Plus className="w-4 h-4 mr-1" />
                Add Ingredient
              </Button>
            </div>
            <div className="space-y-3">
              {ingredients.map((ingredient) => (
                <div key={ingredient.id} className="flex gap-2 items-end">
                  <div className="flex-1">
                    <Label>Name</Label>
                    <Input
                      placeholder="Ingredient name"
                      value={ingredient.name}
                      onChange={(e) =>
                        updateIngredient(ingredient.id, "name", e.target.value)
                      }
                    />
                  </div>
                  <div className="w-20">
                    <Label>Amount</Label>
                    <Input
                      placeholder="2"
                      value={ingredient.amount}
                      onChange={(e) =>
                        updateIngredient(
                          ingredient.id,
                          "amount",
                          e.target.value
                        )
                      }
                    />
                  </div>
                  <div className="w-20">
                    <Label>Unit</Label>
                    <Input
                      placeholder="cups"
                      value={ingredient.unit}
                      onChange={(e) =>
                        updateIngredient(ingredient.id, "unit", e.target.value)
                      }
                    />
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => removeIngredient(ingredient.id)}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              ))}
              {ingredients.length === 0 && (
                <p className="text-muted-foreground text-center py-4">
                  No ingredients added yet. Click &quot;Add Ingredient&quot; to
                  start.
                </p>
              )}
            </div>
          </Card>

          {/* Steps */}
          <Card className="p-4">
            <div className="flex items-center justify-between mb-4">
              <h3>Cooking Steps</h3>
              <Button onClick={addStep} size="sm">
                <Plus className="w-4 h-4 mr-1" />
                Add Step
              </Button>
            </div>
            <div className="space-y-4">
              {steps.map((step) => (
                <Card key={step.id} className="p-4 border-l-4 border-l-primary">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h4>Step {step.stepNumber}</h4>
                      <div className="flex gap-2">
                        {!step.timer ? (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => addTimer(step.id)}
                          >
                            <Timer className="w-4 h-4 mr-1" />
                            Add Timer
                          </Button>
                        ) : (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => removeTimer(step.id)}
                          >
                            <X className="w-4 h-4 mr-1" />
                            Remove Timer
                          </Button>
                        )}
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => removeStep(step.id)}
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Step Title (Optional)</Label>
                      <Input
                        placeholder="e.g., Prepare the sauce"
                        value={step.title}
                        onChange={(e) =>
                          updateStep(step.id, "title", e.target.value)
                        }
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Instructions</Label>
                      <Textarea
                        placeholder="Describe what to do in this step..."
                        value={step.instruction}
                        onChange={(e) =>
                          updateStep(step.id, "instruction", e.target.value)
                        }
                      />
                    </div>

                    {step.timer && (
                      <Card className="p-3 bg-muted">
                        <div className="flex items-center gap-3">
                          <Clock className="w-4 h-4" />
                          <div className="flex gap-2 items-center">
                            <Input
                              type="number"
                              placeholder="Minutes"
                              className="w-20"
                              value={step.timer.minutes}
                              onChange={(e) =>
                                updateStep(step.id, "timer", {
                                  ...step.timer!,
                                  minutes: parseInt(e.target.value) || 0,
                                })
                              }
                            />
                            <span>:</span>
                            <Input
                              type="number"
                              placeholder="Seconds"
                              className="w-20"
                              min="0"
                              max="59"
                              value={step.timer.seconds}
                              onChange={(e) =>
                                updateStep(step.id, "timer", {
                                  ...step.timer!,
                                  seconds: parseInt(e.target.value) || 0,
                                })
                              }
                            />
                            <Input
                              placeholder="Timer label"
                              className="flex-1"
                              value={step.timer.label}
                              onChange={(e) =>
                                updateStep(step.id, "timer", {
                                  ...step.timer!,
                                  label: e.target.value,
                                })
                              }
                            />
                          </div>
                        </div>
                      </Card>
                    )}

                    <div className="space-y-2">
                      <Label>Ingredients Needed (Optional)</Label>
                      <div className="flex flex-wrap gap-2">
                        {ingredients.map((ingredient) => (
                          <Badge
                            key={ingredient.id}
                            variant={
                              step.ingredientsNeeded.includes(ingredient.id)
                                ? "default"
                                : "outline"
                            }
                            className="cursor-pointer"
                            onClick={() => {
                              const newIngredientsNeeded =
                                step.ingredientsNeeded.includes(ingredient.id)
                                  ? step.ingredientsNeeded.filter(
                                      (id) => id !== ingredient.id
                                    )
                                  : [...step.ingredientsNeeded, ingredient.id];
                              updateStep(
                                step.id,
                                "ingredientsNeeded",
                                newIngredientsNeeded
                              );
                            }}
                          >
                            {ingredient.name || "Unnamed ingredient"}
                          </Badge>
                        ))}
                      </div>
                      {ingredients.length === 0 && (
                        <p className="text-muted-foreground">
                          Add ingredients first to assign them to steps.
                        </p>
                      )}
                    </div>
                  </div>
                </Card>
              ))}
              {steps.length === 0 && (
                <p className="text-muted-foreground text-center py-4">
                  No steps added yet. Click &quot;Add Step&quot; to start
                  building your recipe.
                </p>
              )}
            </div>
          </Card>

          {/* Notes */}
          <Card className="p-4">
            <h3 className="mb-4">Additional Notes (Optional)</h3>
            <Textarea
              placeholder="Any additional tips, variations, or notes..."
              value={formData.notes}
              onChange={(e) =>
                setFormData({ ...formData, notes: e.target.value })
              }
            />
          </Card>

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-4">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              disabled={
                !formData.title ||
                !formData.description ||
                ingredients.length === 0 ||
                steps.length === 0
              }
            >
              Save Recipe
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
