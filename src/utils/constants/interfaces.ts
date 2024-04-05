import { Prisma } from "@prisma/client";

export interface Viewport {
    zoom: number,
    latitude: number,
    longitude: number,
}

export interface DBMap {
    id: string,
    imageUrl: string,
    name: string,
    urlValue: string,
}

export interface DBMarker {
    id: string,
    name: string,
    latitude: Prisma.Decimal,
    longitude: Prisma.Decimal,
    createdAt: Date,
    updatedAt: Date,
}