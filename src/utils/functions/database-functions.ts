import {DBMap, DBMarker} from "@/utils/constants/interfaces";
import prisma from "@/lib/prisma";

export async function getAllMapsStyles(): Promise<DBMap[]> {
    return prisma.maps.findMany();
}

export async function getAllMarkers(): Promise<DBMarker[]> {
    return prisma.markers.findMany();
}