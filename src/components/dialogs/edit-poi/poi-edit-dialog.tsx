"use client";

import {
	AlertDialog,
	AlertDialogContent,
	AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import { z } from "zod";
import { useForm, UseFormReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Form } from "@/components/ui/form";
import { FormAddPointDialogType } from "@/utils/constants/interfaces";
import { ApiRoutes } from "@/utils/network/api-routes";
import { ApiMethods } from "@/utils/network/api-methods";
import { EditPoiBody } from "@/utils/network/api-bodies";
import useLoadingState, { LoadingState } from "@/states/loading-state";
import { Headers } from "@/utils/constants/headers";
import { PoiEditForm } from "@/components/dialogs/edit-poi/poi-edit-form";
import DbMarker from "@/models/db-marker";
import usePoiDetailDialogState, {
	PoiDetailDialogState,
} from "@/states/poi-detail-dialog-state";
import React, { useEffect } from "react";

interface Props {
	isShowing: boolean;
	onHide: () => void;
}

const formSchema = z.object({
	name: z.string().min(2, {
		message: "Name must be longer",
	}),
	description: z.string(),
	latitude: z.string().min(3, {
		message: "Latitude is not valid",
	}),
	longitude: z.string().min(3, {
		message: "Longitude is not valid",
	}),
});

export default function PoiEditDialog(props: Props) {
	const changeLoadingState: (newValue: boolean) => void = useLoadingState(
		(state: LoadingState) => state.changeState
	);

	const marker: DbMarker | null = usePoiDetailDialogState(
		(state: PoiDetailDialogState) => state.marker
	);

	const form: UseFormReturn<FormAddPointDialogType> = useForm<
		z.infer<typeof formSchema>
	>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: marker?.name,
			description: marker?.description,
			latitude: `${marker?.latitude}`,
			longitude: `${marker?.longitude}`,
		},
	});

	// Updating of the form's state at the state manager update
	// (it's not automatically updated at the marker's state change)
	useEffect(() => {
		form.setValue("name", `${marker?.name}`);
		form.setValue("description", `${marker?.description}`);
		form.setValue("latitude", `${marker?.latitude}`);
		form.setValue("longitude", `${marker?.longitude}`);
	}, [marker]);

	if (props.isShowing) {
		console.log(`MARKER ${marker}`);
		if (marker == null) {
			props.onHide();
			return <></>;
		}
	}

	async function onSubmit(values: z.infer<typeof formSchema>): Promise<void> {
		const formObj: FormAddPointDialogType = values;
		console.log("Form object retrieved by form", formObj);

		const objToSend: EditPoiBody = {
			id: marker?.id ?? "",
			name: formObj.name,
			description: formObj.description,
			latitude: formObj.latitude,
			longitude: formObj.longitude,
		};
		console.log("Request body", objToSend);

		props.onHide();
		changeLoadingState(true);

		const result: Response = await fetch(ApiRoutes.urlPoi, {
			method: ApiMethods.EDIT_POI_METHOD,
			headers: Headers.JSON_HEADERS,
			body: JSON.stringify(objToSend),
		});
		console.log("Response result", result);

		changeLoadingState(false);
		window.location.reload();
	}

	return (
		<AlertDialog open={props.isShowing} onOpenChange={props.onHide}>
			<AlertDialogContent>
				<AlertDialogTitle className={"flex justify-center"}>
					Add a point
				</AlertDialogTitle>
				<Form {...form}>
					<PoiEditForm
						form={form}
						handleSubmit={(values) => onSubmit(values)}
						closeDialog={props.onHide}
					/>
				</Form>
			</AlertDialogContent>
		</AlertDialog>
	);
}
