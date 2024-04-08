import { create } from "zustand";
import {
    normalMapboxStyleUrl,
    satelliteMapboxStyleUrl,
} from "@/utils/constants/constants";
import DbMap from "@/models/db-map";

export interface MapStyleState {
    maps: DbMap[],
    currentStyle: string,
    changeStyle: (i: number) => void,
    change: () => void,
    setStyles: (mapsStyles: DbMap[]) => void,
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

    changeStyle: (i: number) => set((state: MapStyleState) => ({
        currentStyle: state.maps[i].urlValue,
    })),

    setStyles: (mapsStyles: DbMap[]) => set((state: MapStyleState) => ({
        maps: mapsStyles,
    })),

})));

export default useMapStyleState;