import mapbox from "mapbox-gl";
import React, { useEffect, useRef, useState } from "react";

// Your token on here
mapbox.accessToken = "";

const Mapbox = () => {
  const mapContainerRef = useRef(null);

  const [lng, setLng] = useState(5);
  const [lat, setLat] = useState(34);
  const [zoom, setZoom] = useState(1.5);

  useEffect(() => {
    const map = new mapbox.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [lng, lat],
      zoom: zoom
    });
  }, []);

  return (
    <div>
      <div
        ref={mapContainerRef}
        style={{ position: "absolute", top: 0, bottom: 0, left: 0, right: 0 }}
      />
    </div>
  );
};

export default Mapbox;
