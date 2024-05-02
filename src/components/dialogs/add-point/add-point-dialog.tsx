"use client";

import {
	AlertDialog,
	AlertDialogContent,
	AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import { AddPointForm } from "@/components/dialogs/add-point/add-point-form";
import { z } from "zod";
import { useForm, UseFormReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Form } from "@/components/ui/form";
import { FormAddPointDialogType } from "@/utils/constants/interfaces";
import { ApiRoutes } from "@/utils/network/api-routes";
import { ApiMethods } from "@/utils/network/api-methods";
import { AddPoiBody } from "@/utils/network/bodies";
import { useUser } from "@clerk/nextjs";
import { JSON_HEADERS } from "@/utils/constants/constants";
import useLoadingState, { LoadingState } from "@/states/loading-state";

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

export default function AddPointDialog(props: Props) {
	const userState = useUser();
	const changeLoadingState: (newValue: boolean) => void = useLoadingState(
		(state: LoadingState) => state.changeState
	);

	const form: UseFormReturn<FormAddPointDialogType> = useForm<
		z.infer<typeof formSchema>
	>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: "",
			description: "",
			latitude: "",
			longitude: "",
		},
	});

	async function onSubmit(
		values: z.infer<typeof formSchema>,
		userState: any
	): Promise<void> {
		if (!userState.user?.id) {
			console.log("ERROR: User is null, can't make the request!");
			return;
		}

		const formObj: FormAddPointDialogType = values;
		console.log("Form object retrieved by form", formObj);

		const objToSend: AddPoiBody = {
			userId: userState.user!.id,
			name: formObj.name,
			description: formObj.description,
			latitude: formObj.latitude,
			longitude: formObj.longitude,
		};
		console.log("Request body", objToSend);

		props.onHide();
		changeLoadingState(true);

		const result: Response = await fetch(ApiRoutes.urlPoi, {
			method: ApiMethods.ADD_POI_METHOD,
			headers: JSON_HEADERS,
			body: JSON.stringify(objToSend),
		});
		console.log("Response result", result);

		changeLoadingState(false);
	}

	return (
		<AlertDialog open={props.isShowing} onOpenChange={props.onHide}>
			<AlertDialogContent>
				<AlertDialogTitle className={"flex justify-center"}>
					Add a point
				</AlertDialogTitle>
				<Form {...form}>
					<AddPointForm
						form={form}
						handleSubmit={(values) => onSubmit(values, userState)}
						closeDialog={props.onHide}
					/>
				</Form>
			</AlertDialogContent>
		</AlertDialog>
	);
}
