import React from "react";

import CustomUserButton from "@/components/map/custom-user-button";
import CustomMap from "@/components/map/custom-map";
import SearchbarClosed from "@/components/map/searchbar-closed";

import DialogsWrapper from "@/components/wrappers/dialogs-wrapper";
import DrawersWrapper from "@/components/wrappers/drawers-wrapper";

import MapInitializer from "@/components/map/map-initializer";

import {
	isUserAccessCodeValid,
	parseSerializable,
} from "@/utils/functions/functions";

import DbMap from "@/models/db-map";
import DbMarker from "@/models/db-marker";
import { ScrollAreaDemo } from "@/components/side-poi-groups";
import { redirect } from "next/navigation";
import { Routes } from "@/utils/routes";
import { ApiRequests } from "@/utils/network/api-requests";

export default async function Home(): Promise<React.JSX.Element> {
	const accessCodeValid: boolean = isUserAccessCodeValid();
	if (!accessCodeValid) {
		redirect(Routes.ACCESS);
	}

	const mapsStyles: DbMap[] = await ApiRequests.getMapsList();
	const markers: DbMarker[] = await ApiRequests.getPoiList();

	return (
		<div className={"absolute top-0 right-0 w-screen h-screen"}>
			<DialogsWrapper />
			<DrawersWrapper />

			<div id={"map-page-wrapper"} className={"flex flex-col"}>
				<MapInitializer
					mapsStyles={parseSerializable(mapsStyles)}
					markers={parseSerializable(markers)}
				/>

				<CustomMap />
			</div>

			<SearchbarClosed />

			<CustomUserButton />

			<ScrollAreaDemo />
		</div>
	);
}
