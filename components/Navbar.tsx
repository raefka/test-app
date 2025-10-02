"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { links } from "@/constants";

const Navbar = () => {
  const pathname = usePathname();
  const isActive = (path: string) => pathname === path;

  

  return (
    <>
      <div className="w-[90%] mx-auto mb-4 rounded-b-2xl bg-white shadow-md p-4 md:flex justify-between items-center hidden md:flex">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={
              isActive(link.href)
                ? "font-bold text-xl font-title text-primary border-b-2 border-primary"
                : "font-bold text-xl font-title"
            }
          >
            {link.label}
          </Link>
        ))}
      </div>

      <div className="md:hidden p-4">
        <Sheet>
          <SheetTrigger>
            <Menu className="stroke-primary" />
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle className="font-title text-primary">Menu</SheetTitle>
            </SheetHeader>
            <nav className="flex flex-col gap-4 mt-6 p-6">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={
                    isActive(link.href)
                      ? "font-bold text-lg font-title text-primary border-b-2 border-primary"
                      : "font-bold text-lg font-title"
                  }
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
};

export default Navbar;
