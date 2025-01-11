"use client";
import React from "react";
import { useAuth } from "@/store/auth-context";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import Link from "next/link";
import Image from "next/image";
import LoadingSpinner from "./Skeleton/LoadingSpinner";

const UserButton = () => {
  const { currentUser, logoutUser, loading } = useAuth();
  console.log("CURRENT USER:", currentUser);

  return (
    <>
      {loading ? (
        <LoadingSpinner />
      ) : !loading && currentUser ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="flex flex-row items-center gap-1 cursor-pointer">
              <Image
                src={
                  currentUser?.image
                    ? process.env.NEXT_PUBLIC_URL + currentUser?.image?.url
                    : "/noAvatar.png"
                }
                alt=""
                width={1080}
                height={780}
                unoptimized
                className="rounded-full w-10 h-10 border-2 border-myColor1-300 dark:border-myColor2-100"
              />
              <div className="flex flex-col items-center">
                <span className="text-xs leading-3 font-medium">
                  {currentUser?.name} {currentUser?.surname}
                </span>
                <span className="text-[10px] text-black dark:text-white text-right">
                  {currentUser?.role?.type === "admin"
                    ? "Admin"
                    : currentUser?.role?.type === "teacher"
                    ? "Öğretmen"
                    : currentUser?.role?.type === "parent"
                    ? "Veli"
                    : "Öğrenci"}
                </span>
              </div>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-slate-50 dark:bg-primary text-black p-2 rounded-md shadow-lg mr-1">
            <DropdownMenuLabel className="flex flex-col items-center text-md">
              Hoş Geldin
              <span className="text-red-600" style={{ fontSize: "10px" }}>
                {currentUser?.documentId}
              </span>
              <span className="text-xs">{currentUser?.username}</span>
              <span className="text-xs text-green-700">
                {currentUser?.role?.type === "admin"
                  ? "Admin"
                  : currentUser?.role?.type === "teacher"
                  ? "Öğretmen"
                  : currentUser?.role?.type === "parent"
                  ? "Veli"
                  : "Öğrenci"}
              </span>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <Link href="/auth/profile">
              <DropdownMenuItem className="cursor-pointer">
                <span className="hidden lg:block">Hesabımı Yönet</span>
              </DropdownMenuItem>
            </Link>
            <Link href="/settings">
              <DropdownMenuItem className="cursor-pointer">
                <span className="hidden lg:block">Settings</span>
              </DropdownMenuItem>
            </Link>
            <button className="w-full" onClick={logoutUser}>
              <DropdownMenuItem className="cursor-pointer">
                <span className="hidden lg:block">Çıkış Yap</span>
              </DropdownMenuItem>
            </button>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : null}
    </>
  );
};

export default UserButton;
