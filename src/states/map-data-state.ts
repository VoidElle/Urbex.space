import { create } from "zustand";
import DbMarker from "@/models/db-marker";

export interface MapDataState {
    markers: DbMarker[],
    setMarkers: (markers: DbMarker[]) => void,
}

const useMapDataState = create<MapDataState>(((set) => ({

    markers: [],

    setMarkers: (markers: DbMarker[]) => set((state: MapDataState) => ({
        markers: markers,
    })),

})));

export default useMapDataState;