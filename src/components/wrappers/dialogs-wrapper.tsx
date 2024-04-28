"use client";

import React from "react";
import AddPointDialog from "@/components/dialogs/add-point/add-point-dialog";
import useDialogsState, {
  CurrentShowedDialog,
  DialogsState,
} from "@/states/dialogs-state";
import PoiDetailDialog from "@/components/dialogs/poi-detail-dialog";

const DialogsWrapper = (): React.JSX.Element => {
  const showedDialog: CurrentShowedDialog | undefined = useDialogsState(
    (state: DialogsState) => state.showedDialog,
  );
  const reset: () => void = useDialogsState(
    (state: DialogsState) => state.reset,
  );

  return (
    <>
      <AddPointDialog
        isShowing={showedDialog == CurrentShowedDialog.POI_ADD}
        onHide={reset}
      />

      <PoiDetailDialog
        isShowing={showedDialog == CurrentShowedDialog.POI_DETAIL}
        onHide={reset}
      />
    </>
  );
};

export default DialogsWrapper;
