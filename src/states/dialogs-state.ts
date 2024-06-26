import { create } from "zustand";

export enum CurrentShowedDialog {
	POI_ADD = 0,
	POI_DETAIL = 1,
	POI_EDIT = 2,
	POI_MANAGER = 3,
}

export interface DialogsState {
	showedDialog: CurrentShowedDialog | undefined;
	showDialog: (currentShowedDialog: CurrentShowedDialog) => void;
	reset: () => void;
}

const useDialogsState = create<DialogsState>((set) => ({
	// Currently showed dialog
	showedDialog: undefined,

	// Function to modify the currently showed dialog
	showDialog: (currentShowedDialog: CurrentShowedDialog) =>
		set((_: DialogsState) => ({ showedDialog: currentShowedDialog })),
	reset: () => set((_: DialogsState) => ({ showedDialog: undefined })),
}));

export default useDialogsState;
