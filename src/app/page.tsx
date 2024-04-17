"use client";
import "leaflet/dist/leaflet.css";
import "leaflet/dist/leaflet";
import Map from "@/components/Map";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between  h-screen">
      <Navbar/>
      <Map/>
      <Footer/>
    </main>
  );
}
