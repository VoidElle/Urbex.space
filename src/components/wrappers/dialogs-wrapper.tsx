"use client";

import React from "react";
import AddPointDialog from "@/components/dialogs/add-point/add-point-dialog";
import useDialogsState, {
	CurrentShowedDialog,
	DialogsState,
} from "@/states/dialogs-state";
import PoiDetailDialog from "@/components/dialogs/poi-detail-dialog";
import PoiEditDialog from "@/components/dialogs/edit-poi/poi-edit-dialog";
import PoiManagerDialog from "@/components/dialogs/poi-manager-dialog";

const DialogsWrapper = (): React.JSX.Element => {
	const showedDialog: CurrentShowedDialog | undefined = useDialogsState(
		(state: DialogsState) => state.showedDialog
	);
	const reset: () => void = useDialogsState(
		(state: DialogsState) => state.reset
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

			<PoiEditDialog
				isShowing={showedDialog == CurrentShowedDialog.POI_EDIT}
				onHide={reset}
			/>

			<PoiManagerDialog
				isShowing={showedDialog == CurrentShowedDialog.POI_MANAGER}
				onHide={reset}
			/>
		</>
	);
};

export default DialogsWrapper;
