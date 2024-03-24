"use client";

import Map from "react-map-gl";
import React, {useEffect, useState} from "react";

interface Viewport {
    zoom: number,
    latitude: number,
    longitude: number,
}

export default function CustomMap(): React.JSX.Element {

    const INITIAL_VIEWPORT: Viewport = {
        zoom: 14,
        latitude: 0,
        longitude: 0,
    };

    const [viewport, setViewport] = useState<Viewport>(INITIAL_VIEWPORT);

    useEffect((): void => {
        handleLocationRequest();
    }, []);

    const changeMapCoords = (latitude: number, longitude: number): void => {
        console.log("Latitude: " + latitude + " | Longitude: " + longitude);
        setViewport({
            ...viewport,
            latitude: latitude,
            longitude: longitude,
        });
    };

    function handleLocationRequest(): void {

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(success, error);
            return;
        }

        error();
    }

    const success = (positionParam: GeolocationPosition): void => {
        const coordinates: GeolocationCoordinates = positionParam.coords;
        changeMapCoords(coordinates.latitude, coordinates.longitude);
    }

    function error() {
        console.log("Unable to retrieve your location");
    }

    if (viewport.longitude == 0 && viewport.latitude == 0) {
        return (
            <div></div>
        );
    }

    return (
        <Map
            id={"map"}
            mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
            initialViewState={viewport}
            style={{height: "100vh", position: "absolute", zIndex: "-999"}}
            mapStyle="mapbox://styles/mapbox/streets-v9"
        />
    );
}