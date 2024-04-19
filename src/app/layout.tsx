"use client";
require("@solana/wallet-adapter-react-ui/styles.css");
import { Inter } from "next/font/google";
import "./globals.css";
import dynamic from "next/dynamic";
import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/services/react-query";
const inter = Inter({ subsets: ["latin"] });

const WalletConnectionProvider = dynamic(
  () => import("../providers/wallet-connection-provider"),
  {
    ssr: false,
  }
);


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <QueryClientProvider client={queryClient}>
          <WalletConnectionProvider>
            <Toaster
              position="top-right"
              toastOptions={{
                style: {
                  border: "4px solid #000",
                  color: "#000",
                  fontWeight: "bold",
                  backgroundColor: "#F6F01A",
                  padding: "12px",
                  fontSize: "18px",
                },
              }}
            />

            {children}
          </WalletConnectionProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
