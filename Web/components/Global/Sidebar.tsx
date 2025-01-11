"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "../theme-toggle";
import { Button } from "../ui/button";
import SearchBar from "./SearchBar";
import { getNavRoutes } from "@/services/fetch-api";
import { NavRoute } from "@/types/globalTypes";

import { getIconByName } from "@/utils/icons";
import LoadingSpinner from "./Skeleton/LoadingSpinner";

const Sidebar = () => {
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const [navRoutes, setNavRoutes] = useState<NavRoute[]>([]);

  useEffect(() => {
    setMounted(false);
    const navLink = async () => {
      const response = await getNavRoutes();

      if (response?.success) {
        setMounted(true);
        setNavRoutes(response.data);
      } else {
        console.log("Sidebar Response (İşlem Basarısız) :", response);
      }
    };

    navLink();
  }, []);

  return (
    <aside className="hidden lg:flex h-screen w-72 bg-myColor1-400 dark:bg-myColor1-100 border-r-2 border-slate-200 dark:border-slate-700">
      <div className="flex flex-col gap-4 justify-center items-center w-full">
        {mounted ? (
          <>
            <div className="mx-auto justify-center items-center mt-12">
              <Link href="/">
                <Image
                  alt="Logo"
                  src="/pp.jpg"
                  className="rounded-full w-32 h-32"
                  width={160}
                  height={160}
                />
              </Link>
              <div className="flex justify-center mt-2">
                <ThemeToggle />
              </div>
            </div>

            <nav className="w-[90%] h-full flex-col justify-between md:flex gap-3">
              <ul className="hidden md:flex flex-col items-start gap-4 mt-14">
                {navRoutes.map((link) => {
                  const isActive = pathname === link.route;
                  const IconComponent = getIconByName(link.icon);

                  return (
                    <Button
                      asChild
                      key={link.route}
                      variant={"ghost"}
                      className={cn(
                        "w-full h-12 justify-center",
                        isActive &&
                          "bg-myColor1-300 dark:bg-myColor2-100 dark:hover:bg-myColor2-100/80 text-myColor1-100 border dark:border-myColor1-100"
                      )}
                    >
                      <Link href={link.route}>
                        <div
                          className={cn(
                            "flex items-center w-full gap-2 text-myColor1-100 dark:text-myColor1-500 text-lg",
                            isActive &&
                              "text-myColor1-100 dark:text-myColor1-100 dark:hover:text-myColor1-100"
                          )}
                        >
                          <IconComponent className="w-6 h-6" />
                          <p>{link.name}</p>
                        </div>
                      </Link>
                    </Button>
                  );
                })}
              </ul>

              <ul className="hidden md:flex w-full items-start gap-2 mb-12">
                <SearchBar />
              </ul>
            </nav>
          </>
        ) : (
          <LoadingSpinner />
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
