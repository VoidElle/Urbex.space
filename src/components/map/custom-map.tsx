"use client";

import Map, {GeolocateControl} from "react-map-gl";
import React, {useEffect, useRef, useState} from "react";
import mapboxgl from "mapbox-gl";
import useMapStyleState, {MapStyleState} from "@/states/map-style-state";
import {DBMap, Viewport} from "@/utils/constants/interfaces";
import {getLocalStorageMapStyleId} from "@/utils/functions/local-storage-functions";

// Do not change it to import, it will not work.
const bodyScrollLock = require('body-scroll-lock');

const INITIAL_VIEWPORT: Viewport = {
    zoom: 14,
    latitude: 0,
    longitude: 0,
};

interface Props {
    maps: DBMap[],
}

export default function CustomMap(props: Props): React.JSX.Element {

    let mapToSet: DBMap | undefined = undefined;

    const setStyles: (mapsStyles: DBMap[]) => void = useMapStyleState((state: MapStyleState) => state.setStyles);
    const changeStyle: (i: number) => void = useMapStyleState((state: MapStyleState) => state.changeStyle);

    const retrievedMapStyleId: string = getLocalStorageMapStyleId();

    setStyles(props.maps);
    for (let dbMap of props.maps) {
        console.log(`${dbMap.id} == ${retrievedMapStyleId} | ${dbMap.id == retrievedMapStyleId}`);
        if (dbMap.id == retrievedMapStyleId) {
            mapToSet = dbMap;
            break;
        }
    }

    if (mapToSet != undefined) {
        changeStyle(Number(mapToSet.id));
    }

    // Disabling the scroll of the map
    useEffect((): void => {
        const disableBodyScroll = bodyScrollLock.disableBodyScroll;
        const targetElement: HTMLElement = document.querySelector("#map-page-wrapper")!;
        disableBodyScroll(targetElement);
    }, []);

    const currentStyle: string = useMapStyleState((state: MapStyleState) => state.currentStyle);

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
            mapStyle={currentStyle}
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