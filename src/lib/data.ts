import {
  CodeXml,
  LayoutDashboard,
  MessageSquare,
  Settings,
} from "lucide-react";

export const Nav_Links = [
  {
    title: "Home",
    href: "/",
  },
  {
    title: "Dashboard",
    href: "/dashboard",
    authenticatedOnly: true,
  },
  {
    title: "Settings",
    href: "/settings",
    authenticatedOnly: true,
  },
];

export const Sidebar_Routes = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Conversation",
    href: "/conversation",
    icon: MessageSquare,
  },
  {
    title: "Code Generation",
    href: "/code",
    icon: CodeXml,
  },
  {
    title: "Settings",
    href: "/settings",
    icon: Settings,
  },
];

export const Tools = [
  {
    title: "Conversation",
    href: "/conversation",
    icon: MessageSquare,
    textClr: "text-indigo-500",
    bgClr: "bg-indigo-500/15",
  },
  {
    title: "Code Generation",
    href: "/code",
    icon: CodeXml,
    textClr: "text-teal-600",
    bgClr: "bg-teal-600/15",
  },
];

export const TestimonialsData = [
  {
    name: "Jane",
    avatar: "J",
    title: "Software Engineer",
    description:
      "This is the best app I have ever used. I can’t stop recommending it!",
  },
  {
    name: "Logan",
    avatar: "L",
    title: "Software Engineer",
    description:
      "This is the best app I have ever used. I can’t stop recommending it!",
  },
  {
    name: "Stephens",
    avatar: "S",
    title: "Student",
    description:
      "This is the best app I have ever used. I can’t stop recommending it!",
  },
  {
    name: "Cameron",
    avatar: "C",
    title: "Student",
    description:
      "This is the best app I have ever used. I can’t stop recommending it!",
  },
];
