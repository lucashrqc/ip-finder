"use client";
import { useQuery } from "@tanstack/react-query";
import {
  FullscreenControl,
  Map,
  Marker,
  NavigationControl,
  ScaleControl,
} from "@vis.gl/react-maplibre";
import "maplibre-gl/dist/maplibre-gl.css";
import React, { useEffect, useMemo, useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

type MapComponentProps = {
  longitude: number;
  latitude: number;
  zoom: number;
};

async function getIpLocation(ip: string) {
  const res = await fetch(`http://ip-api.com/json/${ip}`);
  if (!res.ok) {
    throw new Error("Network response was not ok");
  }
  return res.json();
}

type ControlPanelProps = {
  lat: number;
  lon: number;
};

const ControlPanel = React.memo(({ lat, lon }: ControlPanelProps) => {
  return (
    <div className="absolute top-0 right-0 p-1 m-2 bg-white rounded-sm shadow-lg">
      <p>Latitude: {lat}</p>
      <p>Longitude: {lon}</p>
    </div>
  );
});

ControlPanel.displayName = "ControlPanel";

export default function MapComponent({
  longitude = -48.65,
  latitude = -26.88,
  zoom = 14,
}: MapComponentProps) {
  const [ip, setIp] = useState<string>("");
  const [viewState, setViewState] = useState<MapComponentProps>({
    longitude,
    latitude,
    zoom,
  });

  const { data, refetch } = useQuery({
    queryKey: ["ip-location", ip],
    queryFn: () => getIpLocation(ip),
    enabled: false,
  });

  function searchOnEnter(ev: React.KeyboardEvent<HTMLInputElement>) {
    const { key } = ev;

    if (key === "Enter" && ip.length === 13) {
      refetch();
    }
  }

  useEffect(() => {
    if (data) {
      setViewState({
        latitude: data.lat,
        longitude: data.lon,
        zoom: 14,
      });
    }
  }, [data]);

  const markers = useMemo(
    () =>
      ip &&
      data && (
        <Marker key={`marker-${ip}`} longitude={data.lon} latitude={data.lat} anchor="bottom" />
      ),
    [ip, data]
  );

  return (
    <>
      <div className="flex flex-col gap-4">
        <div className="flex w-full max-w-sm items-center space-x-2">
          <Input
            id="ip"
            type="text"
            placeholder="Type your IP address"
            maxLength={15}
            value={ip}
            onInput={(ev) => setIp((ev.target as HTMLInputElement).value)}
            onKeyDown={searchOnEnter}
          />
          <Button variant="outline" onClick={() => refetch()}>
            Search
          </Button>
        </div>
        <div className="rounded-lg">
          <Map
            {...viewState}
            onMove={(evt) => setViewState(evt.viewState)}
            style={{ width: 800, height: 600 }}
            mapStyle="https://api.maptiler.com/maps/streets-v2-dark/style.json?key=RtGljet3cMSGygYs4jsH"
          >
            {markers}
            <FullscreenControl position="top-left" />
            <NavigationControl position="top-left" />
            <ScaleControl />

            <ControlPanel lat={viewState.latitude} lon={viewState.longitude} />
          </Map>
        </div>
      </div>
    </>
  );
}
