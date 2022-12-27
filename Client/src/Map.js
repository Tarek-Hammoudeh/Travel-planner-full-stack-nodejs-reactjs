import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

import "leaflet/dist/leaflet.css";

import "./App.css";

import marker from "./images/markericon.png";
import { Icon } from "leaflet";
const myIcon = new Icon({
  iconUrl: marker,
  iconSize: [40, 40],
});

function Map() {
  return (
    <div class="map">
      <MapContainer
        center={[52.39533169795577, 4.85064057678207]}
        zoom={15}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[52.39533169795577, 4.85064057678207]} icon={myIcon}>
          <Popup>Vertrekbestemming</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}

export default Map;
