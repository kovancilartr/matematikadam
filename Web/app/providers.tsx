"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "@/store/auth-context";

const queryClient = new QueryClient();

export default function ClientProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <AuthProvider>{children}</AuthProvider>
      </ThemeProvider>

      {/* React Query Devtools (isteğe bağlı) */}
      <ReactQueryDevtools initialIsOpen={false} />

      <Toaster
        position="top-center"
        toastOptions={{
          duration: 3000,
          style: {
            background: "white",
            color: "#000",
            borderRadius: "8px",
          },
        }}
      />
    </QueryClientProvider>
  );
}
