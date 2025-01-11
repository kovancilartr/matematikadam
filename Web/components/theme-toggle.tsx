"use client";
import React, { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";

export function ThemeToggle() {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className="flex flex-row items-center rounded-md">
      <Button
        variant="link"
        disabled={resolvedTheme === "light"}
        size="icon"
        onClick={() => {
          setTheme("light");
          toast("Açık temaya geçiş yapıldı", {
            icon: "🌞",
            style: {
              borderRadius: "10px",
              background: "#fff",
              color: "#000",
              cursor: "grab",
            },
          });
        }}
      >
        <Sun
          className={`h-4 w-4 ${
            resolvedTheme === "light" ? "animate-bounce" : ""
          }`}
        />
      </Button>

      {resolvedTheme === "light" ? (
        <ArrowLeft className="h-4 w-4" />
      ) : resolvedTheme === "dark" ? (
        <ArrowRight className="h-4 w-4" />
      ) : null}

      <Button
        variant="link"
        disabled={resolvedTheme === "dark"}
        size="icon"
        onClick={() => {
          setTheme("dark");
          toast("Koyu temaya geçiş yapıldı", {
            icon: "🌙",
            style: {
              borderRadius: "10px",
              background: "#333",
              color: "#fff",
              cursor: "grab",
            },
          });
        }}
      >
        <Moon
          className={`h-4 w-4 ${
            resolvedTheme === "dark" ? "animate-bounce" : ""
          }`}
        />
      </Button>
    </div>
  );
}
