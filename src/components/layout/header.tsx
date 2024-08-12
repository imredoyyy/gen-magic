"use client";

import { cn } from "@/lib/utils";
import { ClerkLoaded, ClerkLoading, useAuth, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";
import { useScroll } from "@/hooks/use-scroll";
import MobilNavbar from "./mobile-navbar";

import { Nav_Links } from "@/lib/data";
import { usePathname } from "next/navigation";
import { ThemeSwitcher } from "../theme-switcher";
import { Separator } from "../ui/separator";

const Header = () => {
  const { isSignedIn } = useAuth();
  const scrolled = useScroll(40);
  const pathname = usePathname();

  return (
    <header
      className={cn(
        "sticky top-0 z-30 border-b border-transparent bg-background transition-colors",
        scrolled && "border-muted bg-background/40 backdrop-blur-xl",
      )}
    >
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between p-4 md:px-8">
        <MobilNavbar isSignedIn={isSignedIn} />
        <Link href="/dashboard" className="flex items-center">
          <div className="relative mr-4 size-8">
            <Image src="/logo-colorful.svg" alt="logo" fill />
          </div>
          <h3 className="text-2xl font-bold">GenMagic</h3>
        </Link>

        <div className="flex items-center gap-x-6">
          <nav className="hidden items-center justify-center md:flex">
            <ul className="flex items-center gap-6">
              {Nav_Links.filter(
                (link) => !link.authenticatedOnly || isSignedIn,
              ).map((link) => (
                <li key={link.title}>
                  <Link
                    href={link.href}
                    className={cn(
                      "font-medium transition-colors md:hover:text-purple-dark",
                      pathname === link.href
                        ? "text-purple-dark"
                        : "text-foreground",
                    )}
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <Separator orientation="vertical" className="hidden h-5 md:block" />
          <div className="flex items-center gap-4">
            {isSignedIn && (
              <>
                <ClerkLoading>
                  <Loader2 className="size-7 animate-spin" />
                </ClerkLoading>
                <ClerkLoaded>
                  <UserButton />
                </ClerkLoaded>
              </>
            )}
            <ThemeSwitcher className="hidden md:inline-flex" />
            <Button asChild className="hidden md:inline-flex">
              <Link href={isSignedIn ? "/dashboard" : "/sign-in"}>
                Get Started
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
