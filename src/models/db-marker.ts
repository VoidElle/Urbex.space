import { Prisma } from "@prisma/client";

export default class DbMarker {
	id: string;
	name: string;
	description: string;
	imageUrl: string | null;
	latitude: Prisma.Decimal;
	longitude: Prisma.Decimal;
	createdAt: Date;
	updatedAt: Date;

	constructor(
		id: string,
		name: string,
		description: string,
		imageUrl: string | null,
		latitude: Prisma.Decimal,
		longitude: Prisma.Decimal,
		createdAt: Date,
		updatedAt: Date
	) {
		this.id = id;
		this.name = name;
		this.description = description;
		this.imageUrl = imageUrl;
		this.latitude = latitude;
		this.longitude = longitude;
		this.createdAt = createdAt;
		this.updatedAt = updatedAt;
	}
}
