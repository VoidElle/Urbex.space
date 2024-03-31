"use client";

import React from "react";
import AddPointDialog from "@/components/dialogs/add-point-dialog";
import useDialogsState, {
    CurrentShowedDialog,
    DialogsState
} from "@/states/dialogs-state";

const DialogsWrapper = (): React.JSX.Element => {

    const showedDialog: CurrentShowedDialog | undefined = useDialogsState((state: DialogsState) => state.showedDialog);
    const reset: () => void = useDialogsState((state: DialogsState) => state.reset);

    return (
        <>

            <AddPointDialog
                isShowing={showedDialog == CurrentShowedDialog.ADD_POI}
                onHide={reset} />

        </>
    );
};

export default DialogsWrapper;