import { create } from "zustand";
import {
    normalMapboxStyleUrl,
    satelliteMapboxStyleUrl,
} from "@/utils/constants";

export interface MapStyleState {
    currentStyle: string,
    change: () => void
}

const useMapStyleState = create<MapStyleState>(((set) => ({

    // Current map style
    currentStyle: normalMapboxStyleUrl,

    // Function to change the current map style
    change: () => set((state: MapStyleState) => ({
        currentStyle: state.currentStyle == normalMapboxStyleUrl
            ? satelliteMapboxStyleUrl
            : normalMapboxStyleUrl
    })),

})));

export default useMapStyleState;