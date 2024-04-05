"use client";

import Map, {GeolocateControl, Marker, MarkerEvent} from "react-map-gl";
import React, {useCallback, useEffect, useRef, useState} from "react";
import mapboxgl from "mapbox-gl";
import useMapStyleState, {MapStyleState} from "@/states/map-style-state";
import {DBMap, DBMarker, Viewport} from "@/utils/constants/interfaces";
import {getLocalStorageMapStyleId} from "@/utils/functions/local-storage-functions";
import 'mapbox-gl/dist/mapbox-gl.css';
import useMapDataState, {MapDataState} from "@/states/map-data-state";


// Do not change it to import, it will not work.
const bodyScrollLock = require('body-scroll-lock');

const INITIAL_VIEWPORT: Viewport = {
    zoom: 14,
    latitude: 0,
    longitude: 0,
};

export default function CustomMap(): React.JSX.Element {

    let mapToSet: DBMap | undefined = undefined;

    const markers: DBMarker[] = useMapDataState((state: MapDataState) => state.markers);

    const maps: DBMap[] = useMapStyleState((state: MapStyleState) => state.maps);
    const changeStyle: (i: number) => void = useMapStyleState((state: MapStyleState) => state.changeStyle);

    // Disabling the scroll of the map
    useEffect((): void => {

        const retrievedMapStyleId: string = getLocalStorageMapStyleId();
        for (let dbMap of maps) {
            console.log(`${dbMap.id} == ${retrievedMapStyleId} | ${dbMap.id == retrievedMapStyleId}`);
            if (dbMap.id == retrievedMapStyleId) {
                mapToSet = dbMap;
                break;
            }
        }

        if (mapToSet != undefined) {
            changeStyle(Number(mapToSet.id));
        }

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

    const map = useRef(null);
    const geolocateControlRef = useCallback((ref: any): void => {
        if (ref) {
            (async () => {
                while (!map.current) await ((() => new Promise((resolve) => setTimeout(resolve, 200)))())
                ref.trigger();
            })()
        }
    }, []);

    if (viewport.longitude == 0 && viewport.latitude == 0) {
        return <></>;
    }

    return (
        <Map
            ref={map}
            mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
            initialViewState={viewport}
            style={{
                height: "100vh",
                position: "absolute",
                zIndex: "-999"
            }}
            mapStyle={currentStyle}
        >

            {
                markers.map((marker: DBMarker) => {
                    return(
                        <Marker
                            onClick={(event): void => {

                                const mapBoxMarker: mapboxgl.Marker = event.target;
                                if (mapBoxMarker == null){
                                    console.error("Clicked marker is null...");
                                    return;
                                }


                                const lngLat: mapboxgl.LngLat = mapBoxMarker.getLngLat();
                                alert(`ID: ${marker.id} | Longitude: ${lngLat.lng} | Latitude: ${lngLat.lat}`);

                                // const dbMarkerPromise: Promise<DBMarker> = getMarkerByCoords(lngLat.lat, lngLat.lng);
                                // console.log(dbMarkerPromise);
                                // dbMarkerPromise.then((dbMarker: DBMarker): void => {
                                //     console.log(dbMarker);
                                // })

                            }}
                            key={marker.id}
                            longitude={Number(marker.longitude)}
                            latitude={Number(marker.latitude)}
                        />
                    );
                })
            }

            <GeolocateControl
                style={{
                    opacity: 0,
                }}
                ref={geolocateControlRef}
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