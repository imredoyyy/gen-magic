import React, { useEffect, useState } from "react";
import { Sheet, SheetClose, SheetContent, SheetTrigger } from "../ui/sheet";
import { Button } from "../ui/button";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import { Nav_Links } from "@/lib/data";
import Link from "next/link";
import useWindowSize from "@/hooks/use-window-size";
import { ThemeSwitcher } from "../theme-switcher";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const MobilNavbar = ({ isSignedIn = false }) => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const size = useWindowSize();

  useEffect(() => {
    if (size?.width && size?.width > 767 && isOpen) {
      setIsOpen(false);
    }
  }, [size, isOpen]);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild className="flex md:hidden">
        <Button variant="ghost" size="icon">
          <Menu />
        </Button>
      </SheetTrigger>

      <SheetContent side="left" closeButton={false} className="p-0">
        <div className="flex items-center justify-between border-b border-muted p-4">
          <div className="flex items-center gap-x-3">
            <div className="relative size-8">
              <Image src="/logo-colorful.svg" alt="logo" fill />
            </div>
            <h3 className="text-2xl font-bold">GenMagic</h3>
          </div>
          <SheetClose asChild>
            <Button variant="ghost" size="icon">
              <X />
            </Button>
          </SheetClose>
        </div>
        <div className="border-b border-muted p-4">
          <ul className="flex flex-col items-start gap-4">
            {Nav_Links.filter(
              (link) => !link.authenticatedOnly || isSignedIn,
            ).map((link) => (
              <li key={link.title} className="w-full">
                <Link
                  href={link.href}
                  onClick={() => {
                    const timeOutId = setTimeout(() => {
                      setIsOpen(false);

                      clearTimeout(timeOutId);
                    }, 400);
                  }}
                  className={cn(
                    "flex font-medium transition-colors active:text-purple-light",
                    pathname === link.href
                      ? "text-purple-light"
                      : "text-foreground",
                  )}
                >
                  {link.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex items-center justify-between p-4">
          <p>Switch Theme</p>
          <ThemeSwitcher isMobile={true} />
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobilNavbar;
