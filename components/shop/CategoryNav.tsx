"use client";

import Link from "next/link";
import { LucideIcon } from "lucide-react";
import { cn } from "@/libs/utils";
import { buttonVariants } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { TooltipProvider } from "@radix-ui/react-tooltip";
import { usePathname } from "next/navigation";

interface NavProps {
  isCollapsed: boolean;
  links: {
    title: string;
    label?: string;
    icon: LucideIcon;
    variant: "default" | "ghost";
    href: string;
  }[];
}

export function CategoryNav({ links, isCollapsed }: NavProps) {
  const pathName = usePathname();

  return (
    <TooltipProvider>
      <div
        data-collapsed={isCollapsed}
        className="group flex gap-4 py-2 data-[collapsed=true]:py-2"
      >
        <nav className="flex gap-4 px-2 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2">
          {links.map((link, index) =>
            isCollapsed ? (
              <Tooltip key={index} delayDuration={0}>
                <TooltipTrigger asChild>
                  <Link
                    href={link.href}
                    className={cn(
                      buttonVariants({
                        variant: link.href === pathName ? "default" : "ghost",
                        size: "icon",
                      }),
                      "h-9 w-9",
                      link.variant === "default" &&
                        "dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white",
                      link.variant === "ghost" &&
                        "border border-transparent hover:border-gray-400 dark:hover:border-gray-600"
                    )}
                  >
                    <span className="hidden sm:sr-only">{link.title}</span>
                    <link.icon className="h-4 w-4" />
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="right" className="flex items-center gap-4">
                  {link.title}
                  {link.label && (
                    <span
                      className={cn(
                        "ml-auto border border-gray-300 dark:border-gray-700 px-2 py-1 rounded", // استایل دیفالت
                        "text-muted-foreground"
                      )}
                    >
                      {link.label}
                    </span>
                  )}
                </TooltipContent>
              </Tooltip>
            ) : (
              <Link
                key={index}
                href={link.href}
                className={cn(
                  buttonVariants({
                    variant: link.href === pathName ? "default" : "ghost",
                    size: "sm",
                  }),
                  link.variant === "default" &&
                    "dark:bg-muted dark:text-white dark:hover:bg-muted dark:hover:text-white",
                  link.variant === "ghost" &&
                    "border border-transparent hover:border-gray-400 dark:hover:border-gray-600",
                  "justify-start"
                )}
              >
                <div className="flex gap-2">
                  <link.icon className="mr-2 h-4 w-4" />
                  <div className="hidden sm:block">{link.title}</div>
                </div>
                {link.label && (
                  <span
                    className={cn(
                      "ml-auto border border-gray-300 dark:border-gray-700 px-2 py-1 rounded", // استایل دیفالت
                      link.variant === "default" && "text-background dark:text-white"
                    )}
                  >
                    {link.label}
                  </span>
                )}
              </Link>
            )
          )}
        </nav>
      </div>
    </TooltipProvider>
  );
}