"use client";

import { useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

export default function Navbar() {
  const { data } = useSession();
  const { connected } = useWallet();

  useEffect(() => {
    console.log(data);
  }, []);

  return (
    <nav className="bg-[#F6F01A] w-full h-24 relative z-[100] border-b-4 border-black p-2 flex items-center justify-end">
      <img
        src="/logo.png"
        className="absolute h-44 top-24 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
      />
      {connected && (
        <WalletMultiButton
          style={{
            fontSize: "20px",
            height: "50px",
          }}
        />
      )}
    </nav>
  );
}
