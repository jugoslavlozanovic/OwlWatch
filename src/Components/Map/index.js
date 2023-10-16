import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import L from "leaflet";
import markerIcon from "../../Assets/marker.png";
import "leaflet/dist/leaflet.css";
import "./main.scss";

function Map() {
  const [userLocation, setUserLocation] = useState();

  // create a new Leaflet icon
  const myIcon = L.icon({
    iconUrl: markerIcon,
    iconSize: [38, 38],
    iconAnchor: [19, 38],
  });

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        // Success callback
        const { latitude, longitude } = position.coords;
        setUserLocation([latitude, longitude]);
      },
      (error) => {
        // Error callback
        console.error(`Error: ${error.message}`);
      },
      {
        enableHighAccuracy: true, // Set enableHighAccuracy to true
        timeout: 5000,
        maximumAge: 0,
      }
    );

  }, []);

  return (
    <div className="mapContainerDiv">
      {userLocation && (
        <MapContainer
          center={userLocation}
          zoom={23}
          dragging={false}
          scrollWheelZoom={false}
          zoomControl={false}
          doubleClickZoom={false}
          tapControl={false}
        >
          <TileLayer url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png" />
          <Marker position={userLocation} icon={myIcon} />
        </MapContainer>
      )}
    </div>
  );
}

export default Map;
