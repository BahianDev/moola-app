"use client";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css";
import "leaflet-defaulticon-compatibility";
import "leaflet/dist/leaflet.css";

import { MapContainer, TileLayer, useMapEvents } from "react-leaflet";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/services/api";
import { useEffect, useState } from "react";
import { socket } from "@/services/socket";
import { useWallet } from "@solana/wallet-adapter-react";
import toast from "react-hot-toast";

interface IConfig {
  ogCount: number;
  wlCount: number;
}

function LocationMarker() {
  const { publicKey } = useWallet();
  useMapEvents({
    click(e) {
      socket.emit("newMessage", {
        lat: e.latlng.lat,
        lng: e.latlng.lng,
        receiver: publicKey?.toString(),
      });
    },
  });

  return <></>;
}

export default function Map() {
  const [isConnected, setIsConnected] = useState(false);
  const [transport, setTransport] = useState("N/A");

  useEffect(() => {
    if (socket.connected) {
      onConnect();
    }

    function onConnect() {
      setIsConnected(true);
      setTransport(socket.io.engine.transport.name);

      socket.io.engine.on("upgrade", (transport) => {
        setTransport(transport.name);
      });
    }

    function onMessage(message: any) {
      console.log(message)
      toast.error("error")
    }

    function onDisconnect() {
      setIsConnected(false);
      setTransport("N/A");
    }

    socket.on("connect", onConnect);
    socket.on("onMessage", (arg) => onMessage(arg))
    socket.on("disconnect", onDisconnect);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
    };
  }, []);

  const { data: config, refetch } = useQuery({
    queryKey: ["config"],
    queryFn: (): Promise<IConfig> =>
      api.get(`/`).then((response) => response.data),
    refetchOnWindowFocus: false,
    initialData: {
      ogCount: 0,
      wlCount: 0,
    },
  });

  return (
    <div className="relative w-full h-full">
      <div className="absolute z-50 top-2 left-2">
        <img src="/book.png" className="h-44" />
        <span className="text-[22px] text-black absolute top-20 left-32 -rotate-6 font-medium border-b-4 border-red-500">
          {config.ogCount} OG
        </span>
      </div>
      <MapContainer
        className="z-0"
        preferCanvas={true}
        center={[7.013667927566642, 3.5156250000000004]}
        zoom={2}
        scrollWheelZoom={false}
        minZoom={3}
        maxZoom={3}
        style={{ height: "100%", width: "100%", background: "#F6F01A" }}
      >
        <TileLayer url="/Map/{z}/{x}/{y}.png" noWrap />
        <LocationMarker />
      </MapContainer>
    </div>
  );
}
