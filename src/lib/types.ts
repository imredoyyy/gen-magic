import { LucideIcon } from "lucide-react";

export type HeadingProps = {
  title: string;
  description: string;
  Icon: LucideIcon;
  iconColor?: string;
  bgColor?: string;
};

export type ChatHistory = {
  role: "user" | "model";
  parts: string;
};
