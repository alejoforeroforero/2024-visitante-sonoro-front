import React from "react";
import Map, { Marker } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";

import styles from "./MapPage.module.css";

const CustomMarker = ({ onClick }) => (
  <div className={styles.marker} onClick={onClick}>
    
  </div>
);

const MapPage = () => {
  const handleMarkerClick = (event) => {
    if (event && event.originalEvent) {
      event.originalEvent.stopPropagation();
    }
    alert("click");
  };

  return (
    <div className={styles.container}>
      <Map
        mapboxAccessToken={import.meta.env.VITE_MAPBOX_TOKEN}
        initialViewState={{
          longitude: -74.07169171487116,
          latitude: 4.713225906131585,
          zoom: 4,
        }}
        style={{ width: "100%", height: "100%" }}
        mapStyle="mapbox://styles/mapbox/light-v11"
      >
        <Marker
          longitude={-74.07169171487116}
          latitude={4.713225906131585}
          anchor="bottom"
        >
          <CustomMarker onClick={handleMarkerClick} />
        </Marker>
      </Map>
    </div>
  );
};

export default MapPage;
