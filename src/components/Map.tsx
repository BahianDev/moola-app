"use client";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css";
import "leaflet-defaulticon-compatibility";
import "leaflet/dist/leaflet.css";

import { MapContainer, TileLayer, useMapEvents } from "react-leaflet";
import { QueryClient, useQuery } from "@tanstack/react-query";
import { api } from "@/services/api";
import { useEffect, useState } from "react";
import { socket } from "@/services/socket";
import { useWallet } from "@solana/wallet-adapter-react";
import toast from "react-hot-toast";
import { queryClient } from "@/services/react-query";
import { useSession } from "next-auth/react";

interface IConfig {
  ogCount: number;
  wlCount: number;
}

function LocationMarker() {
  const { publicKey } = useWallet();
  const { data, status } = useSession();

  useMapEvents({
    click(e) {
      if (status !== 'authenticated') {
        return toast.error("You need make Discord Login")
      }

      const user: any = data

      socket.emit("newMessage", {
        lat: e.latlng.lat,
        lng: e.latlng.lng,
        receiver: publicKey?.toString(),
        discordId: user.discordUser.id
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
      if (message.result == true) {
        queryClient.setQueryData(["config"], (old: any) => {
          return {
            ogCount: message.prize === "og" ? old.ogCount - 1 : old.ogCount,
            wlCount: message.prize === "wl" ? old.wlCount - 1 : old.wlCount,
          };
        });
        toast.success(
          `Congratulations! You won ${message.prize.toUpperCase()}`
        );
      } else {
        if (message.exists == true) {
          toast.error("You`re  already claimed!");
        } else {
          toast.error("Try again!");
        }
      }
    }

    function onDisconnect() {
      setIsConnected(false);
      setTransport("N/A");
    }

    socket.on("connect", onConnect);
    socket.on("onMessage", (arg) => onMessage(arg));
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
      <div className="absolute z-50 top-14 md:top-2 left-2">
        <img src="/book.png" className="h-32 md:h-44" />
        <span className="text-[16px] md:text-[22px] text-black absolute top-14 md:top-20 left-24 md:left-32 -rotate-6 font-medium border-b-4 border-red-500">
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
        maxBounds={[
          [-66.42148583521261, -184.59286987781528],
          [65.74290423785182, 185.09765625],
        ]}
        style={{ height: "100%", width: "100%", background: "#F6F01A" }}
      >
        <TileLayer
          attribution="its offline"
          url="/Map/{z}/{x}/{y}.png"
          noWrap
        />
        <LocationMarker />
      </MapContainer>
    </div>
  );
}
