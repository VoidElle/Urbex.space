import { NextRequest, NextResponse } from "next/server";

import { PoiPostHandler } from "@/app/api/v1/poi/handlers/poi-post-handler";
import { PoiDeleteHandler } from "@/app/api/v1/poi/handlers/poi-delete-handler";
import { PoiGetHandler } from "@/app/api/v1/poi/handlers/poi-get-handler";
import { PoiPutHandler } from "@/app/api/v1/poi/handlers/poi-put-handler";

export async function POST(request: NextRequest): Promise<NextResponse> {
	return PoiPostHandler(request);
}

export async function DELETE(request: NextRequest): Promise<NextResponse> {
	return PoiDeleteHandler(request);
}

export async function GET(request: NextRequest): Promise<NextResponse> {
	return PoiGetHandler(request);
}

export async function PUT(request: NextRequest): Promise<NextResponse> {
	return PoiPutHandler(request);
}
