import {DBMap} from "@/utils/constants/interfaces";
import prisma from "@/lib/prisma";

export async function getAllMapsStyles(): Promise<DBMap[]> {
    return await prisma.maps.findMany();
}