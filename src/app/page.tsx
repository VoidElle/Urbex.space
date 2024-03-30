"use client";

import React, {useEffect, useState} from "react";
import CustomUserButton from "@/components/map/custom-user-button";
import CustomMap from "@/components/map/custom-map";
import {SearchbarClosed} from "@/components/map/searchbar-closed";
import NiceModal from "@ebay/nice-modal-react";

// import "react-modal-global/styles/modal.scss"
// import "react-modal-global/styles/layouts.scss"

// Do not change it to import, it will not work.
const bodyScrollLock = require('body-scroll-lock');

export default function Home() {

    const [addPointDialogOpened, setAddPointDialogOpened] = useState(false);

    // Disabling the scroll of the map
    useEffect((): void => {
        const disableBodyScroll = bodyScrollLock.disableBodyScroll;
        const targetElement: HTMLElement = document.querySelector("#map-page-wrapper")!;
        disableBodyScroll(targetElement);
    }, []);

    return (
        <NiceModal.Provider>
            <div id={"map-page-wrapper"} className={"flex flex-col"}>

                <SearchbarClosed
                    open={addPointDialogOpened}
                    onOpenChange={setAddPointDialogOpened}
                />

                <CustomUserButton />
                <CustomMap />

            </div>
        </NiceModal.Provider>
    );
}