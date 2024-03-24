"use client";

import React, {useEffect} from "react";
import CustomUserButton from "@/components/map/custom_user_button";
import CustomMap from "@/components/map/custom_map";

// Do not change it to import, it will not work.
const bodyScrollLock = require('body-scroll-lock');

export default function Home() {

    // Disabling the scroll of the map
    useEffect((): void => {
        const disableBodyScroll = bodyScrollLock.disableBodyScroll;
        const targetElement: HTMLElement = document.querySelector("#map")!;
        disableBodyScroll(targetElement);
    }, []);

    return (
        <div className={"flex flex-col"}>

            <CustomUserButton />
            <CustomMap />

        </div>
    );
}