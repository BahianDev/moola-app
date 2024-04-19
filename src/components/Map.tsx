"use client";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css";
import "leaflet-defaulticon-compatibility";
import "leaflet/dist/leaflet.css";

import { MapContainer, TileLayer, useMapEvents } from "react-leaflet";

function LocationMarker() {
  useMapEvents({
    click(e) {
      console.log(e.latlng);
    },
  });

  return <></>;
}

export default function Map() {
  return (
    <div className="relative w-full h-full">
      <div className="absolute z-50 top-2 left-2">
        <img src="/book.png" className="h-44" />
        <span className="text-[22px] text-black absolute top-20 left-32 -rotate-6 font-medium border-b-4 border-red-500">500 OG</span>
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
