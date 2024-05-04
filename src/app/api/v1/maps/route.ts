import { NextRequest, NextResponse } from "next/server";

import { MapsGetHandler } from "@/app/api/v1/maps/handlers/maps-get-handler";

export async function GET(request: NextRequest): Promise<NextResponse> {
	return MapsGetHandler(request);
}
