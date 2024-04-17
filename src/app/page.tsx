"use client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { MapComponent } from "@/components";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between  h-screen">
      <Navbar />
      <MapComponent />
      <Footer />
    </main>
  );
}
