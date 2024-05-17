export class ApiRoutes {
	// Base
	static #serverIp: string = "http://localhost:3000";
	static #baseUrl: string = `${this.#serverIp}/api/v1`;

	// POI
	static urlPoi: string = `${this.#baseUrl}/poi`;

	// Maps
	static urlMaps: string = `${this.#baseUrl}/maps`;
}
