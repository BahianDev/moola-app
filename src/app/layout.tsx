"use client"
require("@solana/wallet-adapter-react-ui/styles.css");
import { Inter } from "next/font/google";
import "./globals.css";
import dynamic from "next/dynamic";
import { Toaster } from "react-hot-toast";
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
        <WalletConnectionProvider>
          <Toaster
            position="top-right"
            toastOptions={{
              style: {
                border: "1px solid #02FFA7",
                color: "#02FFA7",
                fontWeight: "bold",
                backgroundColor: "#000000",
                padding: "12px",
                fontSize: "18px",
              },
            }}
          />

          {children}
        </WalletConnectionProvider>
      </body>
    </html>
  );
}
