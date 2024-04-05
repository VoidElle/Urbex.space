import { create } from "zustand";
import { DBMarker } from "@/utils/constants/interfaces";

export interface MapDataState {
    markers: DBMarker[],
    setMarkers: (markers: DBMarker[]) => void,
}

const useMapDataState = create<MapDataState>(((set) => ({

    markers: [],

    setMarkers: (markers: DBMarker[]) => set((state: MapDataState) => ({
        markers: markers,
    })),

})));

export default useMapDataState;