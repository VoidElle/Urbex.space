import { create } from "zustand";
import DbMarker from "@/models/db-marker";

export interface PoiDetailDialogState {
    marker: DbMarker | null,
    setMarker: (marker: DbMarker) => void,
}

const usePoiDetailDialogState = create<PoiDetailDialogState>(((set) => ({

    marker: null,

    setMarker: (marker: DbMarker) => set((state: PoiDetailDialogState) => ({ marker: marker })),

})));

export default usePoiDetailDialogState;