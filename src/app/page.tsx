"use client";

import React, {useEffect, useState} from "react";
import CustomUserButton from "@/components_c/map/custom_user_button";
import CustomMap from "@/components_c/map/custom_map";
import {Searchbar} from "@/components_c/map/searchbar";
import {SearchbarClosed} from "@/components_c/map/searchbar_closed";
import AddPointDialog from "@/components_c/dialogs/add_point_dialog";

// Do not change it to import, it will not work.
const bodyScrollLock = require('body-scroll-lock');

export default function Home() {

    // Disabling the scroll of the map
    useEffect((): void => {
        const disableBodyScroll = bodyScrollLock.disableBodyScroll;
        const targetElement: HTMLElement = document.querySelector("#map-page-wrapper")!;
        disableBodyScroll(targetElement);
    }, []);

    const [open, setOpen] = useState(false);

    return (
        <div id={"map-page-wrapper"} className={"flex flex-col"}>

            <AddPointDialog
                open={open}
                onOpenChange={setOpen}
            />

            <SearchbarClosed                 open={open}
                                             onOpenChange={setOpen}/>

            <CustomUserButton />
            <CustomMap />

        </div>
    );
}