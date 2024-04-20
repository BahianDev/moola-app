"use client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { MapComponent } from "@/components";
import { useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useState } from "react";

export default function Home() {
  const { connected } = useWallet();
  const [hovered, setHovered] = useState(false);
  return (
    <main className="flex min-h-screen flex-col items-center justify-between h-screen">
      <Navbar />
      {!connected ? (
        <MapComponent />
      ) : (
        <div className={`${hovered ? 'bg-home_cow': 'bg-home'} w-full h-full bg-cover bg-center flex items-end justify-center py-10`}>
          <WalletMultiButton>
            <div 
            className="p-4"
              onMouseEnter={() => setHovered(true)}
              onMouseLeave={() => setHovered(false)}
            >
              FIND MOOLA
            </div>
          </WalletMultiButton>
        </div>
      )}
      <Footer />
    </main>
  );
}
