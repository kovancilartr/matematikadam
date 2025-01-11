import React from "react";
import { LogIn } from "lucide-react";
import { Button } from "../ui/button";
import { LoginModal } from "./LoginModal";

const ProtectedScreen = () => {
  return (
    <div
      className="flex flex-col items-center justify-center gap-y-4 p-6 min-h-screen"
      style={{ minHeight: "calc(100vh - 80px)" }}
    >
      <div className="bg-slate-50 dark:bg-gray-800 p-6 rounded-lg shadow-lg text-center">
        <h1 className="text-4xl font-bold text-gray-800 dark:text-white">
          Erişim Engellendi 🚫
        </h1>
        <p className="text-md text-gray-600 dark:text-gray-300 mt-2">
          Bu bölüme erişebilmek için giriş yapmanız gerekmektedir.
        </p>
        <div className="mt-4">
          <LoginModal onConfirm={() => console.log("Confirm")}>
            <Button
              variant="default"
              className="px-6 py-3 flex w-full items-center gap-x-2 text-white bg-myColor2-200 hover:bg-black dark:bg-white dark:hover:bg-slate-200"
            >
              <LogIn className="h-5 w-5" />
              Giriş Yap
            </Button>
          </LoginModal>
        </div>
      </div>
      {/* <p className="text-sm text-gray-500 dark:text-gray-400">
        Giriş yapmak için hesabınız yok mu?{" "}
        <span className="text-blue-500 dark:text-blue-400 hover:cursor-help">
          Yönetici ile iletişime geçmelisin.
        </span>
      </p> */}
    </div>
  );
};

export default ProtectedScreen;
