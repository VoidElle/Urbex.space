import { NextRequest, NextResponse } from "next/server";

import { PoiPostHandler } from "@/app/api/v1/poi/handlers/poi-post-handler";
import { PoiDeleteHandler } from "@/app/api/v1/poi/handlers/poi-delete-handler";
import { PoiGetHandler } from "@/app/api/v1/poi/handlers/poi-get-handler";

export async function POST(request: NextRequest): Promise<NextResponse> {
	return PoiPostHandler(request);
}

export async function DELETE(request: NextRequest): Promise<NextResponse> {
	return PoiDeleteHandler(request);
}

export async function GET(request: NextRequest): Promise<NextResponse> {
	return PoiGetHandler(request);
}
