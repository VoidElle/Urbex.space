import { Prisma } from "@prisma/client";

export default class DbMarker {

    id: string;
    name: string;
    latitude: Prisma.Decimal;
    longitude: Prisma.Decimal;
    createdAt: Date;
    updatedAt: Date;

    constructor(id: string, name: string, latitude: Prisma.Decimal, longitude: Prisma.Decimal, createdAt: Date, updatedAt: Date) {
        this.id = id;
        this.name = name;
        this.latitude = latitude;
        this.longitude = longitude;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

}