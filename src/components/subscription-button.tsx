"use client";

import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { Loader2, Zap } from "lucide-react";

import { Button } from "./ui/button";

interface SubscriptionButtonProps {
  isPro: boolean;
}

const SubscriptionButton = ({ isPro }: SubscriptionButtonProps) => {
  const [loading, setLoading] = useState(false);

  const onClick = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/stripe");

      window.location.href = response.data.url;
      toast.success(
        isPro
          ? "Redirecting to Stripe billing portal..."
          : "Redirecting to Stripe checkout...",
      );
    } catch (err) {
      console.error("Billing Error", err);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      disabled={loading}
      onClick={onClick}
      variant={isPro ? "purple" : "gradient"}
    >
      {!isPro && !loading ? (
        <Zap className="mr-2 size-4" />
      ) : (
        loading && <Loader2 className="mr-2 size-4 animate-spin" />
      )}
      {isPro ? "Manage Subscription" : "Upgrade Now"}
    </Button>
  );
};

export default SubscriptionButton;
