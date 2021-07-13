import React, { useRef, useEffect, useState } from "react";
import mapbox from "mapbox-gl";

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

    // Add navigation control (the +/- zoom buttons)
    map.addControl(new mapbox.NavigationControl(), "top-right");

    map.on("move", () => {
      setLng(map.getCenter().lng.toFixed(4));
      setLat(map.getCenter().lat.toFixed(4));
      setZoom(map.getZoom().toFixed(2));
    });

    let geoJsonData = {
      type: "FeatureCollection",
      features: [
        {
          type: "Feature",
          geometry: {
            type: "Point",
            coordinates: [127, 35]
          }
        }
      ]
    };
    map.on("load", function() {
      map.addSource("source-id", {
        type: "geojson",
        data: geoJsonData
      });

      // Add a symbol layer
      map.addLayer({
        id: "points",
        type: "circle",
        source: "source-id",
        paint: {
          "circle-radius": 5,
          "circle-color": "rgb(255, 0, 0)"
        }
      });
    });

    // Clean up on unmount
    return () => map.remove();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

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
