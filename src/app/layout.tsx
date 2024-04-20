"use client";
require("@solana/wallet-adapter-react-ui/styles.css");
import { Inter } from "next/font/google";
import "./globals.css";
import dynamic from "next/dynamic";
import { Toaster } from "react-hot-toast";
import { QueryClientProvider } from "@tanstack/react-query";
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
      <head>
        <title>Moola</title>
        <meta property="og:title" content="Moola" key="title" />
        <link rel="shortcut icon" href="/logo.png" />
        <meta property="og:image" content="/logo.png" />
        <meta
          name="description"
          content="Creating the first and biggest puzzle IP on Solana. Find Moola the golden cow to win $SOL 🐮"
        />
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://sansalabs.io/" />
        <meta property="twitter:title" content={`Moola`} />
        <meta
          property="twitter:description"
          content={`Creating the first and biggest puzzle IP on Solana. Find Moola the golden cow to win $SOL 🐮`}
        />
        <meta property="twitter:image" content="/logo.png" />
      </head>
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
