"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import Markdown from "react-markdown";
import Heading from "@/components/heading";
import { CodeXml } from "lucide-react";
import { formSchema } from "./constants";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { ChatHistory } from "@/lib/types";
import Loader from "@/components/loader";
import { ModelAvatar, UserAvatar } from "@/components/avatar";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
("react-syntax-highlighter");
("react-syntax-highlighter");
import { coy } from "react-syntax-highlighter/dist/esm/styles/prism";
import { useProModal } from "@/hooks/use-pro-modal";
import { toast } from "sonner";

const CodePage = () => {
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
      const response = await axios.post("/api/code", {
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
        toast.error("Something went wrong");
      }
    } finally {
      router.refresh();
    }
  };

  return (
    <div>
      <Heading
        title="Code Generation"
        description="Generate code using descriptive text."
        Icon={CodeXml}
        iconColor="text-teal-600"
        bgColor="bg-teal-600/10"
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
                        placeholder="Explain JavaScript scopes"
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
            <div className="flex w-full items-center justify-center rounded-lg bg-muted p-8">
              <Loader label="Generating..." />
            </div>
          )}
          {chatHistory.length === 0 && !isLoading && (
            <div>No conversation yet.</div>
          )}
          <div className="flex flex-col-reverse gap-y-4">
            {chatHistory.map((chat) => (
              <div
                key={chat.parts}
                className={cn(
                  "flex w-full items-start gap-x-8 rounded-lg border border-black/10 p-8 text-sm",
                  chat.role === "user" ? "bg-zinc-100" : "bg-muted",
                )}
              >
                {chat.role === "user" ? <UserAvatar /> : <ModelAvatar />}
                <div className="overflow-hidden rounded-lg text-sm leading-7">
                  <Markdown
                    components={{
                      code(props) {
                        const { children, className, node, ...rest } = props;
                        const match = /language-(\w+)/.exec(className || "");

                        return match ? (
                          <SyntaxHighlighter
                            {...rest}
                            PreTag="div"
                            language={match[1]}
                            style={coy}
                            className="rounded-lg border border-black/15 shadow-sm"
                          >
                            {String(children).replace(/\n$/, "")}
                          </SyntaxHighlighter>
                        ) : (
                          <code {...rest} className="prose">
                            {children}
                          </code>
                        );
                      },
                    }}
                  >
                    {chat.parts}
                  </Markdown>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodePage;
