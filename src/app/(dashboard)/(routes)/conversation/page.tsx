"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import Markdown from "react-markdown";
import Heading from "@/components/heading";
import { MessageSquare } from "lucide-react";
import { formSchema } from "./constants";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { ChatHistory } from "@/lib/types";
import Loader from "@/components/loader";
import { ModelAvatar, UserAvatar } from "@/components/avatar";
import { useProModal } from "@/hooks/use-pro-modal";
import { toast } from "sonner";

const ConversationPage = () => {
  const router = useRouter();
  const proModal = useProModal();
  const [chatHistory, setChatHistory] = useState<ChatHistory[]>([]);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    const { prompt } = data;
    if (prompt.trim() === "") return;

    try {
      const response = await axios.post("/api/conversation", {
        history: chatHistory,
        prompt,
      });

      const data: string = response.data;
      setChatHistory((prev) => [
        ...prev,
        {
          role: "user",
          parts: prompt,
        },
        {
          role: "model",
          parts: data,
        },
      ]);

      form.reset();
    } catch (err: any) {
      if (err?.response?.status === 403) {
        proModal.onOpen();
      } else {
        toast.error("Something went wrong.");
      }
    } finally {
      router.refresh();
    }
  };

  return (
    <div>
      <Heading
        title="Conversation"
        description="Chat with the most advanced AI model."
        Icon={MessageSquare}
        iconColor="text-indigo-500"
        bgColor="bg-indigo-500/15"
      />
      <div className="px-4 lg:px-8">
        <div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="grid w-full grid-cols-12 gap-2 rounded-lg border px-3 py-4 focus-within:shadow-sm md:px-6"
            >
              <FormField
                name="prompt"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="col-span-12 lg:col-span-10">
                    <FormControl className="m-0 p-0">
                      <Input
                        type="text"
                        {...field}
                        className="w-full border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                        disabled={isLoading}
                        placeholder="Why is the sky blue?"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                variant="purple"
                disabled={isLoading}
                className={cn("col-span-12 w-full lg:col-span-2")}
              >
                Generate
              </Button>
            </form>
          </Form>
        </div>
        <div className="mt-4 space-y-4">
          {isLoading && (
            <div className="flex w-full items-center justify-center rounded-lg bg-muted/50 p-8">
              <Loader label="Generating..." />
            </div>
          )}
          {chatHistory.length === 0 && <div>No conversation yet.</div>}
          <div className="flex flex-col-reverse gap-y-4">
            {chatHistory.map((chat) => (
              <div
                key={chat.parts}
                className={cn(
                  "flex w-full items-start gap-x-8 rounded-lg p-8 text-sm",
                  chat.role === "user"
                    ? "bg-muted-foreground/25 text-right"
                    : "bg-muted",
                )}
              >
                {chat.role === "user" ? <UserAvatar /> : <ModelAvatar />}
                <div className="prose dark:prose-invert">
                  <Markdown>{chat.parts}</Markdown>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConversationPage;
