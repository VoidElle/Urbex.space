import React from "react";
import {create} from "zustand";
import AddPointDialog from "@/components/dialogs/add-point-dialog";

export enum CurrentShowedDialog {
    ADD_POI = 0,
}

export interface DialogsManagerState {
    showedDialog: CurrentShowedDialog | undefined,
    showDialog: (currentShowedDialog: CurrentShowedDialog) => void,
    reset: () => void
}

const useDialogsManager = create<DialogsManagerState>(((set) => ({

    // Currently showed dialog
    showedDialog: undefined,

    // Function to modify the currently showed dialog
    showDialog: (currentShowedDialog: CurrentShowedDialog) => set((_: DialogsManagerState) => ({ showedDialog: currentShowedDialog })),
    reset: () => set((_: DialogsManagerState) => ({ showedDialog: undefined })),

})));

const DialogsManager = (): React.JSX.Element => {

    const showedDialog: CurrentShowedDialog | undefined = useDialogsManager((state: DialogsManagerState) => state.showedDialog);
    const reset: () => void = useDialogsManager((state: DialogsManagerState) => state.reset);

    return (
        <>

            <AddPointDialog
                isShowing={showedDialog == CurrentShowedDialog.ADD_POI}
                onHide={reset} />

        </>
    );
};

export {useDialogsManager, DialogsManager};