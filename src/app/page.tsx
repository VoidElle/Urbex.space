"use client";

import React, { useEffect } from "react";
import CustomUserButton from "@/components/map/custom-user-button";
import CustomMap from "@/components/map/custom-map";
import { SearchbarClosed } from "@/components/map/searchbar-closed";
import { DialogsManager } from "@/components/managers/dialogs-manager";
import {DrawersManager} from "@/components/managers/drawers-manager";

// Do not change it to import, it will not work.
const bodyScrollLock = require('body-scroll-lock');

export default function Home() {

    // Disabling the scroll of the map
    useEffect((): void => {
        const disableBodyScroll = bodyScrollLock.disableBodyScroll;
        const targetElement: HTMLElement = document.querySelector("#map-page-wrapper")!;
        disableBodyScroll(targetElement);
    }, []);

    return (
        <div id={"map-page-wrapper"} className={"flex flex-col"}>

            <DialogsManager />
            <DrawersManager />

            <SearchbarClosed />

            <CustomUserButton/>
            <CustomMap/>

        </div>
    );
}