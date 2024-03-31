import { create } from "zustand";
import {
    normalMapboxStyleUrl,
    satelliteMapboxStyleUrl,
} from "@/utils/constants/constants";
import {DBMap} from "@/utils/constants/interfaces";

export interface MapStyleState {
    maps: DBMap[],
    currentStyle: string,
    change: () => void
    setStyles: (mapsStyles: DBMap[]) => void,
}

const useMapStyleState = create<MapStyleState>(((set) => ({

    maps: [],

    // Current map style
    currentStyle: normalMapboxStyleUrl,

    // Function to change the current map style
    change: () => set((state: MapStyleState) => ({
        currentStyle: state.currentStyle == normalMapboxStyleUrl
            ? satelliteMapboxStyleUrl
            : normalMapboxStyleUrl
    })),

    setStyles: (mapsStyles: DBMap[]) => set((state: MapStyleState) => ({
        maps: mapsStyles,
    })),

})));

export default useMapStyleState;