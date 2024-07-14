import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchRecordings } from "@/redux/states/recordingsActions";
import Map, { NavigationControl, Marker } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";

import styles from "./MapPage.module.css";

const CustomMarker = ({ onClick }) => (
  <div className={styles.marker} onClick={onClick}></div>
);

const MapPage = () => {
  const dispatch = useDispatch();

  const { recordings, error, status } = useSelector(
    (state) => state.recordings
  );

  const [filters, setFilters] = useState({
    title: "",
    categoryId: null,
  });

  const mapRef = useRef(null);

  useEffect(() => {
    const request = dispatch(fetchRecordings(filters));

    return () => {
      request.abort();
    };
  }, [dispatch, filters]);

  const handleMarkerClick = (marker) => {
    if (mapRef.current.getZoom() < 14) {
      const end = {
        center: [marker.longitude, marker.latitude],
        zoom: 14,
        //bearing: 130,
        pitch: 10,
      };

      mapRef.current.flyTo({
        ...end,
        duration: 3000,
        essential: true,
      });

      setCurrentZoom(14);
    } else {
      alert(marker.title);
    }
  };

  return (
    <div className={styles.container}>
      <Map
        ref={mapRef}
        mapboxAccessToken={import.meta.env.VITE_MAPBOX_TOKEN}
        initialViewState={{
          longitude: -74.07169171487116,
          latitude: 4.713225906131585,
          zoom: 4,
        }}
        style={{ width: "100%", height: "100%" }}
        // mapStyle="mapbox://styles/mapbox/light-v11"
        mapStyle="mapbox://styles/alejoforero/clyk7b6tm01s101qrelom2c6g"
      >
        <NavigationControl
          style={{
            marginTop: "80px",
          }}
          position="top-right"
        />
        {recordings.map((marker) => {
          return (
            <Marker
              key={marker.id}
              longitude={marker.longitude}
              latitude={marker.latitude}
              anchor="bottom"
            >
              <CustomMarker onClick={() => handleMarkerClick(marker)} />
            </Marker>
          );
        })}
      </Map>
    </div>
  );
};

export default MapPage;
