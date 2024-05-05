export class ApiRoutes {
	// Base
	static #serverIp: string = "http://127.0.0.1:3000";
	static #baseUrl: string = `${this.#serverIp}/api/v1`;

	// POI
	static urlPoi: string = `${this.#baseUrl}/poi`;

	// Maps
	static urlMaps: string = `${this.#baseUrl}/maps`;
}
