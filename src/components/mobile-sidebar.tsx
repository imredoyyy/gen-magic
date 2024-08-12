"use client";

import { useEffect, useState } from "react";

import { Menu } from "lucide-react";

import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import Sidebar from "./sidebar";

import useWindowSize from "@/hooks/use-window-size";

interface MobileSidebarProps {
  apiLimitCount: number;
  isPro: boolean;
}

const MobileSidebar = ({
  apiLimitCount = 0,
  isPro = false,
}: MobileSidebarProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const size = useWindowSize();

  useEffect(() => {
    if (size?.width && size?.width > 767 && isOpen) {
      setIsOpen(false);
    }
  }, [size, isOpen]);

  const handleCloseSheet = () => {
    const timeOutId = setTimeout(() => {
      setIsOpen(false);
      clearTimeout(timeOutId);
    }, 400);
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu />
        </Button>
      </SheetTrigger>

      <SheetContent side="left" className="p-0">
        <Sidebar
          apiLimitCount={apiLimitCount}
          isPro={isPro}
          onClick={handleCloseSheet}
        />
      </SheetContent>
    </Sheet>
  );
};

export default MobileSidebar;
