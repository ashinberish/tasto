import { useState, useEffect } from "react";
import {
  Clock,
  Users,
  ChefHat,
  Timer,
  Play,
  Pause,
  RotateCcw,
  Check,
} from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Avatar } from "./ui/avatar";
import { Progress } from "./ui/progress";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Recipe, Ingredient } from "../types/recipe";

interface RecipeDetailViewProps {
  recipe: Recipe;
  isOpen: boolean;
  onClose: () => void;
}

interface TimerState {
  minutes: number;
  seconds: number;
  isRunning: boolean;
  originalMinutes: number;
  originalSeconds: number;
}

export function RecipeDetailView({
  recipe,
  isOpen,
  onClose,
}: RecipeDetailViewProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());
  const [timers, setTimers] = useState<{ [stepId: string]: TimerState }>({});

  // Initialize timers for steps that have them
  useEffect(() => {
    const newTimers: { [stepId: string]: TimerState } = {};
    recipe.steps.forEach((step) => {
      if (step.timer) {
        newTimers[step.id] = {
          minutes: step.timer.minutes,
          seconds: step.timer.seconds,
          isRunning: false,
          originalMinutes: step.timer.minutes,
          originalSeconds: step.timer.seconds,
        };
      }
    });
    setTimers(newTimers);
  }, [recipe.steps]);

  // Timer countdown effect
  useEffect(() => {
    const interval = setInterval(() => {
      setTimers((prevTimers) => {
        const newTimers = { ...prevTimers };
        Object.keys(newTimers).forEach((stepId) => {
          const timer = newTimers[stepId];
          if (timer.isRunning) {
            if (timer.seconds > 0) {
              timer.seconds--;
            } else if (timer.minutes > 0) {
              timer.minutes--;
              timer.seconds = 59;
            } else {
              timer.isRunning = false;
              // Timer finished - could add notification here
            }
          }
        });
        return newTimers;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const toggleTimer = (stepId: string) => {
    setTimers((prev) => ({
      ...prev,
      [stepId]: {
        ...prev[stepId],
        isRunning: !prev[stepId].isRunning,
      },
    }));
  };

  const resetTimer = (stepId: string) => {
    const step = recipe.steps.find((s) => s.id === stepId);
    if (step?.timer) {
      setTimers((prev) => ({
        ...prev,
        [stepId]: {
          ...prev[stepId],
          minutes: step.timer!.minutes,
          seconds: step.timer!.seconds,
          isRunning: false,
        },
      }));
    }
  };

  const toggleStepCompletion = (stepIndex: number) => {
    const newCompleted = new Set(completedSteps);
    if (newCompleted.has(stepIndex)) {
      newCompleted.delete(stepIndex);
    } else {
      newCompleted.add(stepIndex);
    }
    setCompletedSteps(newCompleted);
  };

  const getIngredientById = (id: string): Ingredient | undefined => {
    return recipe.ingredients.find((ing) => ing.id === id);
  };

  const formatTime = (minutes: number, seconds: number): string => {
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  const progress = (completedSteps.size / recipe.steps.length) * 100;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <ChefHat className="w-5 h-5" />
            {recipe.title}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Recipe Header */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="aspect-video rounded-lg overflow-hidden">
              <ImageWithFallback
                src={recipe.image}
                alt={recipe.title}
                className="w-full h-full object-cover"
                fill={true}
              />
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Avatar className="w-10 h-10">
                  <ImageWithFallback
                    src={recipe.author.avatar}
                    alt={recipe.author.name}
                    className="w-full h-full object-cover"
                    width={40}
                    height={40}
                  />
                </Avatar>
                <div>
                  <p className="font-medium">{recipe.author.name}</p>
                  <p className="text-muted-foreground">
                    @{recipe.author.username}
                  </p>
                </div>
              </div>

              <p className="text-muted-foreground">{recipe.description}</p>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-muted-foreground" />
                  <span>Prep: {recipe.prepTime}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Timer className="w-4 h-4 text-muted-foreground" />
                  <span>Cook: {recipe.cookTime}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-muted-foreground" />
                  <span>{recipe.servings} servings</span>
                </div>
                <div>
                  <Badge>{recipe.difficulty}</Badge>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {recipe.tags.map((tag) => (
                  <Badge key={tag} variant="secondary">
                    #{tag}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          {/* Progress */}
          <Card className="p-4">
            <div className="flex items-center justify-between mb-2">
              <h3>Cooking Progress</h3>
              <span className="text-muted-foreground">
                {completedSteps.size} of {recipe.steps.length} steps completed
              </span>
            </div>
            <Progress value={progress} className="h-2" />
          </Card>

          {/* Ingredients */}
          <Card className="p-4">
            <h3 className="mb-4">Ingredients</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {recipe.ingredients.map((ingredient) => (
                <div
                  key={ingredient.id}
                  className="flex justify-between items-center p-2 rounded border"
                >
                  <span>{ingredient.name}</span>
                  <span className="text-muted-foreground">
                    {ingredient.amount} {ingredient.unit}
                  </span>
                </div>
              ))}
            </div>
          </Card>

          {/* Steps */}
          <Card className="p-4">
            <h3 className="mb-4">Cooking Steps</h3>
            <div className="space-y-4">
              {recipe.steps.map((step, index) => (
                <Card
                  key={step.id}
                  className={`p-4 border-l-4 ${
                    completedSteps.has(index)
                      ? "border-l-green-500 bg-green-50 dark:bg-green-950"
                      : index === currentStep
                      ? "border-l-primary bg-primary/5"
                      : "border-l-gray-300"
                  }`}
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <h4 className="flex items-center gap-2">
                          Step {step.stepNumber}
                          {completedSteps.has(index) && (
                            <Check className="w-4 h-4 text-green-600" />
                          )}
                        </h4>
                        {step.title && (
                          <span className="text-muted-foreground">
                            - {step.title}
                          </span>
                        )}
                      </div>
                      <Button
                        variant={
                          completedSteps.has(index) ? "default" : "outline"
                        }
                        size="sm"
                        onClick={() => toggleStepCompletion(index)}
                      >
                        {completedSteps.has(index)
                          ? "Completed"
                          : "Mark Complete"}
                      </Button>
                    </div>

                    <p>{step.instruction}</p>

                    {/* Timer */}
                    {step.timer && timers[step.id] && (
                      <Card className="p-3 bg-muted">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <Timer className="w-4 h-4" />
                            <span className="font-medium">
                              {step.timer.label}
                            </span>
                            <span className="text-xl font-mono">
                              {formatTime(
                                timers[step.id].minutes,
                                timers[step.id].seconds
                              )}
                            </span>
                          </div>
                          <div className="flex gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => toggleTimer(step.id)}
                            >
                              {timers[step.id].isRunning ? (
                                <Pause className="w-4 h-4" />
                              ) : (
                                <Play className="w-4 h-4" />
                              )}
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => resetTimer(step.id)}
                            >
                              <RotateCcw className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </Card>
                    )}

                    {/* Ingredients needed for this step */}
                    {step.ingredientsNeeded.length > 0 && (
                      <div className="space-y-2">
                        <h5 className="font-medium text-sm">
                          Ingredients needed:
                        </h5>
                        <div className="flex flex-wrap gap-2">
                          {step.ingredientsNeeded.map((ingredientId) => {
                            const ingredient = getIngredientById(ingredientId);
                            return ingredient ? (
                              <Badge key={ingredientId} variant="outline">
                                {ingredient.amount} {ingredient.unit}{" "}
                                {ingredient.name}
                              </Badge>
                            ) : null;
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                </Card>
              ))}
            </div>
          </Card>

          {/* Notes */}
          {recipe.notes && (
            <Card className="p-4">
              <h3 className="mb-2">Notes</h3>
              <p className="text-muted-foreground">{recipe.notes}</p>
            </Card>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
