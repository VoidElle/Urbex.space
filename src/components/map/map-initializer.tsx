"use client";

import React from "react";

import { DBMap, DBMarker } from "@/utils/constants/interfaces";
import useMapStyleState, { MapStyleState } from "@/states/map-style-state";
import useMapDataState, { MapDataState } from "@/states/map-data-state";

interface Props {
    mapsStyles: DBMap[],
    markers: DBMarker[],
}

const MapInitializer = (props: Props): React.JSX.Element => {

    const setStyles: (mapsStyles: DBMap[]) => void = useMapStyleState((state: MapStyleState) => state.setStyles);
    setStyles(props.mapsStyles);

    const setMarkers: (markers: DBMarker[]) => void = useMapDataState((state: MapDataState) => state.setMarkers);
    setMarkers(props.markers);

    return <></>;
};

export default MapInitializer;