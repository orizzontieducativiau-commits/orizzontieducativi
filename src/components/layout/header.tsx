"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

export function Header() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-8">
        {/* Left — OE logo mark */}
        <Link href="/" className="flex items-center">
          <span className="text-2xl font-normal tracking-tight text-black">OE</span>
        </Link>

        {/* Center — Logo image (absolute centered) */}
        <Link href="/" className="absolute left-1/2 -translate-x-1/2">
          <Image
            src="/images/logo.png"
            alt="Orizzonti Educativi"
            width={140}
            height={60}
            className="h-12 w-auto"
            priority
          />
        </Link>

        {/* Right — Desktop nav */}
        <nav className="hidden md:flex items-center gap-6">
          <Link
            href="/blog"
            className="text-sm font-medium text-gray-600 transition-colors hover:text-black"
          >
            Blog
          </Link>
          <Link
            href="/consulenze"
            className="text-sm font-medium bg-gray-900 text-white px-4 py-2 rounded-full transition-colors hover:bg-black"
          >
            Consulenze
          </Link>
        </nav>

        {/* Right — Mobile hamburger */}
        <div className="flex items-center md:hidden">
          {mounted ? (
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="h-9 w-9">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[280px]">
                <SheetTitle className="sr-only">Menu di navigazione</SheetTitle>
                <nav className="flex flex-col gap-4 mt-8">
                  <Link
                    href="/blog"
                    onClick={() => setOpen(false)}
                    className="text-lg font-medium text-gray-600 transition-colors hover:text-black"
                  >
                    Blog
                  </Link>
                  <Link
                    href="/consulenze"
                    onClick={() => setOpen(false)}
                    className="text-lg font-medium text-gray-600 transition-colors hover:text-black"
                  >
                    Consulenze
                  </Link>
                </nav>
              </SheetContent>
            </Sheet>
          ) : (
            <Button variant="ghost" size="icon" className="h-9 w-9">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Menu</span>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
