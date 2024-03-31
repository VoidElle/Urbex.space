import React from "react";
import {create} from "zustand";
import ChangeMapStyleDrawer from "@/components/drawers/change-map-style-drawer";

export enum CurrentShowedDrawer {
    CHANGE_MAP_STYLE = 0,
}

export interface DrawersManagerState {
    showedDrawer: CurrentShowedDrawer | undefined,
    showDrawer: (CurrentShowedDrawer: CurrentShowedDrawer) => void,
    reset: () => void
}

const useDrawersManager = create<DrawersManagerState>(((set) => ({

    // Currently showed drawer
    showedDrawer: undefined,

    // Function to modify the currently showed drawer
    showDrawer: (currentShowedDrawer: CurrentShowedDrawer) => set((_: DrawersManagerState) => ({ showedDrawer: currentShowedDrawer })),
    reset: () => set((_: DrawersManagerState) => ({ showedDrawer: undefined })),

})));

const DrawersManager = (): React.JSX.Element => {

    const showedDrawer: CurrentShowedDrawer | undefined = useDrawersManager((state: DrawersManagerState) => state.showedDrawer);
    const reset: () => void = useDrawersManager((state: DrawersManagerState) => state.reset);

    console.log("Ciao => " + showedDrawer);

    return (
        <>

            <ChangeMapStyleDrawer
                isShowing={showedDrawer == CurrentShowedDrawer.CHANGE_MAP_STYLE}
                onHide={reset} />

        </>
    );
};

export { useDrawersManager, DrawersManager };