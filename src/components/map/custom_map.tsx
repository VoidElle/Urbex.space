import Map from "react-map-gl";
import React from "react";

export default function CustomMap() {
    return (
        <Map
            id={"map"}
            mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
            initialViewState={{
                longitude: -122.4,
                latitude: 37.8,
                zoom: 14
            }}
            style={{height: "100vh", position: "absolute", zIndex: "-999"}}
            mapStyle="mapbox://styles/mapbox/streets-v9"
        />
    );
}