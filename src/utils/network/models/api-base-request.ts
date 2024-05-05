export class ApiBaseRequest {
	route: string;
	method: string;
	headers: HeadersInit | undefined;
	body: BodyInit | null | undefined;

	constructor(
		route: string,
		method: string,
		headers: HeadersInit,
		body: object | null
	) {
		this.route = route;
		this.method = method;
		this.headers = headers;

		if (body != null) {
			this.body = JSON.stringify(body);
		}
	}
}
