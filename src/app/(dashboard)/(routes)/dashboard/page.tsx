"use client";

import { useRouter } from "next/navigation";

import { Card } from "@/components/ui/card";
import { Tools } from "@/lib/data";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";

const DashboardPage = () => {
  const router = useRouter();

  return (
    <div>
      <div className="mb-8 space-y-4">
        <h1 className="text-center text-2xl font-bold md:text-4xl">
          Explore the magic of AI ✨
        </h1>
        <p className="text-center text-sm text-muted-foreground md:text-base">
          Chat with the smartest AI - Experience the power of AI
        </p>
      </div>

      <div className="space-y-4 px-4 md:px-20 lg:px-32">
        {Tools.map((tool) => (
          <Card
            onClick={() => router.push(tool.href)}
            key={tool.href}
            className="flex cursor-pointer items-center justify-between border-muted p-4 transition duration-200 md:hover:shadow-md md:hover:shadow-muted-foreground/10"
          >
            <div className="flex items-center gap-x-4">
              <div className={cn("w-fit rounded-md p-2", tool.bgClr)}>
                <tool.icon className={cn("size-8", tool.textClr)} />
              </div>
              <div className="font-semibold">{tool.title}</div>
            </div>
            <ArrowRight className={cn("size-5", tool.textClr)} />
          </Card>
        ))}
      </div>
    </div>
  );
};

export default DashboardPage;
