"use client";

import { useEffect, useState } from "react";

import { Zap } from "lucide-react";

import { Card, CardContent } from "./ui/card";
import { Progress } from "./ui/progress";
import { Button } from "./ui/button";

import { MAX_FREE_COUNTS } from "@/constants/constant";
import { useProModal } from "@/hooks/use-pro-modal";

type FreeCounterProps = {
  apiLimitCount: number;
  isPro: boolean;
};

const FreeCounter = ({
  apiLimitCount = 0,
  isPro = false,
}: FreeCounterProps) => {
  const [mounted, setMounted] = useState(false);
  const proModal = useProModal();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  if (isPro) {
    return null;
  }

  return (
    <div className="px-3">
      <Card className="border border-purple-light/50 bg-white/5">
        <CardContent className="py-6">
          <div className="mb-4 space-y-2 text-center text-sm text-white">
            <p>
              {apiLimitCount} / {MAX_FREE_COUNTS} Free Generations
            </p>
            <Progress
              className="h-3"
              value={(apiLimitCount / MAX_FREE_COUNTS) * 100}
            />
          </div>
          <Button
            variant="gradient"
            onClick={proModal.onOpen}
            className="w-full bg-purple-light"
          >
            <Zap className="mr-2 size-4 fill-white" /> Upgrade Now
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default FreeCounter;
