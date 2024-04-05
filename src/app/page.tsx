import React from "react";

import CustomUserButton from "@/components/map/custom-user-button";
import CustomMap from "@/components/map/custom-map";
import SearchbarClosed from "@/components/map/searchbar-closed";

import DialogsWrapper from "@/components/wrappers/dialogs-wrapper";
import DrawersWrapper from "@/components/wrappers/drawers-wrapper";

import MapInitializer from "@/components/map/map-initializer";

import { DBMap, DBMarker } from "@/utils/constants/interfaces";
import { getAllMapsStyles, getAllMarkers } from "@/utils/functions/database-functions";
import { parseSerializable } from "@/utils/functions/functions";

export default async function Home(): Promise<React.JSX.Element> {

    const mapsStyles: DBMap[] = await getAllMapsStyles();
    const markers: DBMarker[] = await getAllMarkers();

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