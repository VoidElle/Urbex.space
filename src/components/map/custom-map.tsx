"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import Map, { GeolocateControl, Marker } from "react-map-gl";
import useMapStyleState, { MapStyleState } from "@/states/map-style-state";
import { Viewport } from "@/utils/constants/interfaces";
import { getLocalStorageMapStyleId } from "@/utils/functions/local-storage-functions";
import "mapbox-gl/dist/mapbox-gl.css";
import useMapDataState, { MapDataState } from "@/states/map-data-state";
import { MarkerEvent } from "react-map-gl/src/types/events";

import DbMap from "@/models/db-map";
import DbMarker from "@/models/db-marker";
import useDialogsState, {
  CurrentShowedDialog,
  DialogsState,
} from "@/states/dialogs-state";
import usePoiDetailDialogState, {
  PoiDetailDialogState,
} from "@/states/poi-detail-dialog-state";

// Do not change it to import, it will not work.
const bodyScrollLock = require("body-scroll-lock");

const INITIAL_VIEWPORT: Viewport = {
  zoom: 14,
  latitude: 0,
  longitude: 0,
};

export default function CustomMap(): React.JSX.Element {
  let mapToSet: DbMap | undefined = undefined;

  const markers: DbMarker[] = useMapDataState(
    (state: MapDataState) => state.markers,
  );

  const setMarker: (marker: DbMarker) => void = usePoiDetailDialogState(
    (state: PoiDetailDialogState) => state.setMarker,
  );
  const showDialog: (currentShowedDialog: CurrentShowedDialog) => void =
    useDialogsState((state: DialogsState) => state.showDialog);

  const maps: DbMap[] = useMapStyleState((state: MapStyleState) => state.maps);
  const changeStyle: (i: number) => void = useMapStyleState(
    (state: MapStyleState) => state.changeStyle,
  );

  // Disabling the scroll of the map
  useEffect((): void => {
    const retrievedMapStyleId: string = getLocalStorageMapStyleId();
    for (let dbMap of maps) {
      // console.log(`${dbMap.id} == ${retrievedMapStyleId} | ${dbMap.id == retrievedMapStyleId}`);
      if (dbMap.id == retrievedMapStyleId) {
        mapToSet = dbMap;
        break;
      }
    }

    if (mapToSet != undefined) {
      changeStyle(Number(mapToSet.id));
    }

    const disableBodyScroll = bodyScrollLock.disableBodyScroll;
    const targetElement: HTMLElement =
      document.querySelector("#map-page-wrapper")!;
    disableBodyScroll(targetElement);
  }, []);

  const currentStyle: string = useMapStyleState(
    (state: MapStyleState) => state.currentStyle,
  );

  const geoControlRef = useRef<mapboxgl.GeolocateControl>();
  const [viewport, setViewport] = useState<Viewport>(INITIAL_VIEWPORT);

  function changeMapCoords(latitude: number, longitude: number): void {
    console.log(
      "INFO: Map -> Latitude: " + latitude + " | Longitude: " + longitude,
    );
    setViewport({
      ...viewport,
      latitude: latitude,
      longitude: longitude,
    });
  }

  function handleLocationRequest(): void {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(success, error);
      return;
    }

    error();
  }

  function success(positionParam: GeolocationPosition): void {
    const coordinates: GeolocationCoordinates = positionParam.coords;
    changeMapCoords(coordinates.latitude, coordinates.longitude);
  }

  function error(): void {
    console.log("ERROR: Map -> Unable to retrieve the location");
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
        while (!map.current)
          await (() => new Promise((resolve) => setTimeout(resolve, 200)))();
        ref.trigger();
      })();
    }
  }, []);

  // Todo: Change to a loader
  //      In case of timeout -> Load the map with the viewport even if it's at 0
  if (viewport.longitude == 0 && viewport.latitude == 0) {
    console.log("ERROR: Map -> Can't load viewport");
    return <></>;
  }
  console.log("INFO: Map -> Viewport loaded successfully");

  return (
    <Map
      ref={map}
      mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
      initialViewState={viewport}
      style={{
        height: "100vh",
        position: "absolute",
        zIndex: "0",
      }}
      mapStyle={currentStyle}
    >
      {markers.map((marker: DbMarker) => {
        return (
          <Marker
            key={marker.id}
            onClick={(
              event: MarkerEvent<mapboxgl.Marker, MouseEvent>,
            ): void => {
              const mapBoxMarker: mapboxgl.Marker = event.target;
              if (mapBoxMarker == null) {
                console.error("Clicked marker is null...");
                return;
              }

              let retrievedDbMarker: DbMarker | null = null;
              for (const dbMarker of markers) {
                if (dbMarker.id == marker.id) {
                  retrievedDbMarker = dbMarker;
                  break;
                }
              }

              if (retrievedDbMarker == null) {
                console.error("Could not find retrieved marker");
                return;
              }

              setMarker(retrievedDbMarker);
              showDialog(CurrentShowedDialog.POI_DETAIL);

              // const lngLat: mapboxgl.LngLat = mapBoxMarker.getLngLat();
              // alert(`ID: ${marker.id} | Longitude: ${lngLat.lng} | Latitude: ${lngLat.lat}`);

              // const dbMarkerPromise: Promise<DBMarker> = getMarkerByCoords(lngLat.lat, lngLat.lng);
              // console.log(dbMarkerPromise);
              // dbMarkerPromise.then((dbMarker: DBMarker): void => {
              //     console.log(dbMarker);
              // })
            }}
            longitude={Number(marker.longitude)}
            latitude={Number(marker.latitude)}
          />
        );
      })}

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
