"use client";

import Map, {GeolocateControl} from "react-map-gl";
import React, {useEffect, useRef, useState} from "react";
import mapboxgl from "mapbox-gl";
import {normalMapboxStyleUrl} from "@/utils/constants";

const INITIAL_VIEWPORT: Viewport = {
    zoom: 14,
    latitude: 0,
    longitude: 0,
};

export default function CustomMap(): React.JSX.Element {

    const geoControlRef = useRef<mapboxgl.GeolocateControl>();
    const [viewport, setViewport] = useState<Viewport>(INITIAL_VIEWPORT);

    const changeMapCoords = (latitude: number, longitude: number): void => {
        console.log("Latitude: " + latitude + " | Longitude: " + longitude);
        setViewport({
            ...viewport,
            latitude: latitude,
            longitude: longitude,
        });
    };

    const handleLocationRequest = (): void => {

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

    const error = (): void => {
        console.log("Unable to retrieve your location");
    }

    useEffect((): void => {
        handleLocationRequest();
    }, []);

    useEffect(() => {
        // Activate as soon as the control is loaded
        geoControlRef.current?.trigger();
    }, [geoControlRef.current]);

    if (viewport.longitude == 0 && viewport.latitude == 0) {
        return <></>;
    }

    return (
        <Map
            mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
            initialViewState={viewport}
            style={{
                height: "100vh",
                position: "absolute",
                zIndex: "-999"
            }}
            mapStyle={normalMapboxStyleUrl}
        >
            <GeolocateControl
                position={"top-left"}
                showUserLocation={true}
                showAccuracyCircle={true}
                positionOptions={{
                    enableHighAccuracy: true,
                }}
                trackUserLocation={true}
                showUserHeading={true}
            />
        </Map>
    );
}