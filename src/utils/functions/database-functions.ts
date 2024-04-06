import prisma from "@/lib/prisma";

import DbMarker from "@/models/db-marker";
import DbMap from "@/models/db-map";

export async function getAllMapsStyles(): Promise<DbMap[]> {
    return prisma.maps.findMany();
}

export async function getAllMarkers(): Promise<DbMarker[]> {
    return prisma.markers.findMany();
}