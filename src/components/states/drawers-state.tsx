import { create } from "zustand";

export enum CurrentShowedDrawer {
    CHANGE_MAP_STYLE = 0,
}

export interface DrawersState {
    showedDrawer: CurrentShowedDrawer | undefined,
    showDrawer: (CurrentShowedDrawer: CurrentShowedDrawer) => void,
    reset: () => void
}

const useDrawersState = create<DrawersState>(((set) => ({

    // Currently showed drawer
    showedDrawer: undefined,

    // Function to modify the currently showed drawer
    showDrawer: (currentShowedDrawer: CurrentShowedDrawer) => set((_: DrawersState) => ({ showedDrawer: currentShowedDrawer })),
    reset: () => set((_: DrawersState) => ({ showedDrawer: undefined })),

})));

export default useDrawersState;