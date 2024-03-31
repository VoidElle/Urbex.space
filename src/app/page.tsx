import React from "react";

import CustomUserButton from "@/components/map/custom-user-button";
import CustomMap from "@/components/map/custom-map";
import SearchbarClosed from "@/components/map/searchbar-closed";

import DialogsWrapper from "@/components/wrappers/dialogs-wrapper";
import DrawersWrapper from "@/components/wrappers/drawers-wrapper";
import {DBMap} from "@/utils/constants/interfaces";
import {getAllMapsStyles} from "@/utils/functions/database-functions";

export default async function Home() {

    const mapsStyles: DBMap[] = await getAllMapsStyles();

    return (
        <div
            id={"map-page-wrapper"}
            className={"flex flex-col"}
        >

            <DialogsWrapper />
            <DrawersWrapper />

            <SearchbarClosed />

            <CustomUserButton/>

            <CustomMap
                maps={mapsStyles}
            />

        </div>
    );
}