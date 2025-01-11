"use client";
import React from "react";
import { ArrowLeft, LogIn } from "lucide-react";
import { Button } from "../ui/button";
import { LoginModal } from "./LoginModal";
import { useAuth } from "@/store/auth-context";
import UserButton from "./UserButton";
import LoadingSpinner from "./Skeleton/LoadingSpinner";
import { usePathname } from "next/navigation";
import Link from "next/link";

const Header = () => {
  const { isLoggedIn, loading } = useAuth();
  const pathname = usePathname();

  const isCourseDetailsPage = pathname?.includes("/details");
  return (
    <header className="bg-myColor1-400 dark:bg-myColor1-100 bg-opacity-25 dark:bg-opacity-25 border-b-2 dark:border-myColor1-400/20 backdrop-blur-md backdrop-saturate-200  h-16 mx-auto flex justify-between px-4 items-center sticky z-50 top-0">
      <div className="flex flex-row items-center gap-2">
        {isCourseDetailsPage ? (
          <Link href={`/${pathname.split("/")[1]}`}>
            <Button variant={"outline"}>
              <ArrowLeft className="h-4 w-4" />
              <h2>Geri Dön</h2>
            </Button>
          </Link>
        ) : null}
      </div>
      <div className="justify-end items-center">
        {loading ? (
          <LoadingSpinner />
        ) : !loading && isLoggedIn ? (
          <UserButton />
        ) : (
          <LoginModal onConfirm={() => console.log("Confirm")}>
            <Button className="bg-myColor2-200 dark:bg-myColor2-100 dark:hover:bg-myColor2-100/80 text-md">
              <LogIn />
              Giriş Yap
            </Button>
          </LoginModal>
        )}
      </div>
    </header>
  );
};

export default Header;
