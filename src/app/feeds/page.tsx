"use client";

import { AppNavigation } from "@/components/AppNavigation";
import { RecipeFeed } from "@/components/RecipeFeed";
import RecipeFeedWrapper from "@/components/RecipeFeedWrapper";

export default function FeedsPage() {
  const currentUser = {
    name: "John Doe",
    avatar: "",
  };
  return (
    <>
      <AppNavigation
        currentUser={currentUser}
        onNewRecipe={() => {}}
        onSearch={() => {}}
      />
      <RecipeFeedWrapper />
    </>
  );
}
