export interface AddPoiBody {
	userId: string;
	name: string;
	description: string;
	latitude: string;
	longitude: string;
}

export interface EditPoiBody {
	id: string;
	name: string;
	description: string;
	latitude: string;
	longitude: string;
}
