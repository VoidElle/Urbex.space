import React from "react";

import CustomUserButton from "@/components/map/custom-user-button";
import CustomMap from "@/components/map/custom-map";
import SearchbarClosed from "@/components/map/searchbar-closed";

import DialogsWrapper from "@/components/wrappers/dialogs-wrapper";
import DrawersWrapper from "@/components/wrappers/drawers-wrapper";

import MapInitializer from "@/components/map/map-initializer";

import { getAllMapsStyles, getAllMarkers } from "@/utils/functions/database-functions";
import { parseSerializable } from "@/utils/functions/functions";

import DbMap from "@/models/db-map";
import DbMarker from "@/models/db-marker";

export default async function Home(): Promise<React.JSX.Element> {

    const mapsStyles: DbMap[] = await getAllMapsStyles();
    const markers: DbMarker[] = await getAllMarkers();

    return (
        <div
            id={"map-page-wrapper"}
            className={"flex flex-col"}
        >

            <MapInitializer
                mapsStyles={parseSerializable(mapsStyles)}
                markers={parseSerializable(markers)}
            />

            <DialogsWrapper />
            <DrawersWrapper />

            <SearchbarClosed />

            <CustomUserButton />

            <CustomMap />

        </div>
    );
}