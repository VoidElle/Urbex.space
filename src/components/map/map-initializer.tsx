"use client";

import React from "react";

import useMapStyleState, { MapStyleState } from "@/states/map-style-state";
import useMapDataState, { MapDataState } from "@/states/map-data-state";
import DbMap from "@/models/db-map";
import DbMarker from "@/models/db-marker";

interface Props {
    mapsStyles: DbMap[],
    markers: DbMarker[],
}

export default function MapInitializer(props: Props): React.JSX.Element {

    const setStyles: (mapsStyles: DbMap[]) => void = useMapStyleState((state: MapStyleState) => state.setStyles);
    setStyles(props.mapsStyles);

    const setMarkers: (markers: DbMarker[]) => void = useMapDataState((state: MapDataState) => state.setMarkers);
    setMarkers(props.markers);

    return <></>;
};