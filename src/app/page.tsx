"use client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useEffect } from "react";
import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import Canva from "@/components/Canva";

export default function Home() {
  const { status } = useSession();

  useEffect(() => {
    if (status !== "authenticated" && status !== "loading") {
      signIn("discord");
    }
  }, [status]);

  return (
    <main className="flex h-dvh w-dvw flex-col items-center justify-between">
      <Navbar />
      <Canva />
      <Footer />
    </main>
  );
}
