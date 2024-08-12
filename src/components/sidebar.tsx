"use client";

import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

import { Sidebar_Routes } from "@/lib/data";
import { cn } from "@/lib/utils";
import FreeCounter from "./free-counter";

type SidebarProps = {
  onClick?: () => void;
  apiLimitCount: number;
  isPro: boolean;
};

const Sidebar = ({ onClick, apiLimitCount, isPro = false }: SidebarProps) => {
  const pathname = usePathname();

  return (
    <div className="flex h-full flex-col space-y-4 bg-purple-dark py-4 text-background">
      <div className="flex-1 px-3 py-2">
        <Link href="/" className="mb-14 flex w-fit items-center pl-3">
          <div className="relative mr-4 size-8">
            <Image src="/logo.svg" alt="logo" fill />
          </div>
          <h3 className="text-2xl font-bold text-white">GenMagic</h3>
        </Link>
        <div className="space-y-1.5">
          {Sidebar_Routes.map((route) => (
            <Link
              href={route.href}
              key={route.href}
              onClick={onClick}
              className={cn(
                "flex w-full items-center gap-x-3 rounded-md p-2.5 transition-colors duration-300 md:hover:bg-purple-light md:hover:text-white",
                pathname === route.href
                  ? "bg-purple-light text-white"
                  : "text-zinc-300",
              )}
            >
              <route.icon className="size-5" />
              <span>{route.title}</span>
            </Link>
          ))}
        </div>
      </div>
      <FreeCounter apiLimitCount={apiLimitCount} isPro={isPro} />
    </div>
  );
};

export default Sidebar;
