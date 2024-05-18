"use client";

import DbMarker from "@/models/db-marker";
import usePoiDetailDialogState, {
	PoiDetailDialogState,
} from "@/states/poi-detail-dialog-state";

import React from "react";

import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";

import Image from "next/image";
import useDialogsState, {
	CurrentShowedDialog,
	DialogsState,
} from "@/states/dialogs-state";

interface Props {
	isShowing: boolean;
	onHide: () => void;
}

export default function PoiDetailDialog(props: Props): React.JSX.Element {
	const marker: DbMarker | null = usePoiDetailDialogState(
		(state: PoiDetailDialogState) => state.marker
	);

	const showDialog: (currentShowedDialog: CurrentShowedDialog) => void =
		useDialogsState((state: DialogsState) => state.showDialog);

	if (props.isShowing) {
		console.log(`MARKER ${marker}`);
		if (marker == null) {
			props.onHide();
			return <></>;
		}
	}

	function handleEditButtonClick(): void {
		props.onHide();
		showDialog(CurrentShowedDialog.POI_EDIT);
	}

	function handleDeleteButtonClick(): void {
		// Todo: Delete request
		props.onHide();
	}

	return (
		<Dialog open={props.isShowing} onOpenChange={props.onHide}>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>{marker?.name}</DialogTitle>
					<DialogDescription>
						<div className={"mt-5 mb-5"}>{marker?.description}</div>

						{marker?.imageUrl != null && (
							<div className={""}>
								<Image
									src={
										marker?.imageUrl ? marker.imageUrl : ""
									}
									width={500}
									height={500}
									alt="Image of the POI"
								/>
							</div>
						)}
					</DialogDescription>
				</DialogHeader>
				<DialogFooter>
					<Button onClick={handleDeleteButtonClick}>
						<span className="mdi mdi-trash-can"></span>
					</Button>
					<Button onClick={handleEditButtonClick}>
						<span className="mdi mdi-pencil"></span>
					</Button>
					<Button
						onClick={() =>
							openGoogleMaps(
								Number(marker?.latitude),
								Number(marker?.longitude)
							)
						}
					>
						Open on GMaps
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}

const openGoogleMaps = (latitude: Number, longitude: Number): void => {
	window.open(
		`https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`,
		"_blank",
		"noopener,noreferrer"
	);
};
