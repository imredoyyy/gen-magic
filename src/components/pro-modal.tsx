"use client";

import { useState } from "react";
import axios from "axios";

import { useProModal } from "@/hooks/use-pro-modal";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Card } from "./ui/card";

import { Tools } from "@/lib/data";
import { cn } from "@/lib/utils";
import { CheckCircle, Loader2, Zap } from "lucide-react";

const ProModal = () => {
  const [loading, setLoading] = useState(false);
  const proModal = useProModal();

  const onSubscribe = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/stripe");

      window.location.href = response.data.url;
    } catch (err) {
      console.log("Stripe Client Error", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={proModal.isOpen} onOpenChange={proModal.onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex flex-col items-center justify-center gap-y-4 pb-2">
            <div className="flex items-center justify-center gap-x-2 py-1 font-bold">
              Upgrade to GenMagic
              <Badge variant="gradient" className="px-4 py-1 text-sm uppercase">
                Pro
              </Badge>
            </div>
          </DialogTitle>
          <DialogDescription className="space-y-2 pt-2 text-center font-medium">
            {Tools.map((tool) => (
              <Card
                key={tool.title}
                className="flex items-center justify-between p-3"
              >
                <div className="flex items-center gap-x-4">
                  <div className={cn("w-fit rounded-md p-2", tool.bgClr)}>
                    <tool.icon className={cn("size-6", tool.textClr)} />
                  </div>
                  <div className="text-sm font-semibold">{tool.title}</div>
                </div>
                <CheckCircle className="size-5 text-purple-light" />
              </Card>
            ))}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            onClick={onSubscribe}
            variant="gradient"
            disabled={loading}
            size="lg"
            className="w-full"
          >
            {loading ? (
              <Loader2 className="mr-2 size-4 animate-spin" />
            ) : (
              <Zap className="mr-2 size-4 fill-white" />
            )}
            Upgrade
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
export default ProModal;
