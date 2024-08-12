import React from "react";

import { checkSubscription } from "@/lib/subscription";

import Heading from "@/components/heading";
import { Settings } from "lucide-react";
import SubscriptionButton from "@/components/subscription-button";

const SettingsPage = async () => {
  const isPro = await checkSubscription();
  return (
    <div>
      <Heading
        title="Settings"
        description="Manage account settings"
        Icon={Settings}
        iconColor="text-orange-700"
        bgColor="bg-orange-700/15"
      />

      <div className="space-y-4 px-4 lg:px-8">
        <div className="text-sm text-muted-foreground">
          {isPro
            ? "You are currently on the pro plan."
            : "You are currently on the free plan."}
        </div>
        <SubscriptionButton isPro={isPro} />
      </div>
    </div>
  );
};

export default SettingsPage;
