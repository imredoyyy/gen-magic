import * as React from "react";

import { cn } from "@/lib/utils";

interface ContainerProps extends React.HTMLAttributes<HTMLElement> {
  innerClassName?: React.HtmlHTMLAttributes<HTMLDivElement>["className"];
}

const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
  ({ className, innerClassName, children, ...props }: ContainerProps, ref) => {
    return (
      <section
        className={cn("w-full py-16 md:py-20 2xl:py-24", className)}
        ref={ref}
        {...props}
      >
        <div
          className={cn(
            "mx-auto flex w-full max-w-[1440px] flex-col gap-6 px-4 md:gap-12 md:px-8",
            innerClassName,
          )}
        >
          {children}
        </div>
      </section>
    );
  },
);

Container.displayName = "Container";

export default Container;
