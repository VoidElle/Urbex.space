import DbMarker from "@/models/db-marker";
import { ApiRoutes } from "@/utils/network/api-routes";
import { ApiMethods } from "@/utils/network/api-methods";
import { Headers } from "@/utils/constants/headers";
import { ApiBaseRequest } from "@/utils/network/models/api-base-request";
import DbMap from "@/models/db-map";

export class ApiRequests {
	/**
	 * Function to retrieve the list of the Points of interest
	 *
	 * @return a Promise that contains the list of POIs
	 */
	static getPoiList = async (): Promise<DbMarker[]> => {
		const baseRequest: ApiBaseRequest = new ApiBaseRequest(
			ApiRoutes.urlPoi,
			ApiMethods.GET_POI_LIST_METHOD,
			Headers.JSON_HEADERS,
			null
		);

		const result: Response = await ApiRequests.#coreRequest(baseRequest);

		return await result.json();
	};

	/**
	 * Function to retrieve the list of the Maps style
	 *
	 * @return a Promise that contains the list of the Maps style
	 */
	static getMapsList = async (): Promise<DbMap[]> => {
		const baseRequest: ApiBaseRequest = new ApiBaseRequest(
			ApiRoutes.urlMaps,
			ApiMethods.GET_MAPS_LIST_METHOD,
			Headers.JSON_HEADERS,
			null
		);

		const result: Response = await ApiRequests.#coreRequest(baseRequest);

		return await result.json();
	};

	/**
	 * Core function to emit all the requests
	 *
	 * @param baseRequest the base object of all requests
	 * @return a Promise which contains the Response
	 */
	static #coreRequest = async (
		baseRequest: ApiBaseRequest
	): Promise<Response> => {
		console.log(
			`[REQUEST] (${baseRequest.method}) to "${baseRequest.route}"`,
			baseRequest.body
		);
		const result: Response = await fetch(baseRequest.route, {
			method: baseRequest.method,
			headers: baseRequest.headers,
			body: baseRequest.body,
		});
		console.log(
			`[RESPONSE] (${baseRequest.method}) to "${baseRequest.route}"`,
			await result.clone().json()
		);

		return result;
	};
}
