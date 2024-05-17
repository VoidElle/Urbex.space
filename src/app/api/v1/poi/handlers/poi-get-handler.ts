import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { Markers } from "@prisma/client";

export async function PoiGetHandler(
	request: NextRequest
): Promise<NextResponse> {
	try {
		const id: string | undefined = request.nextUrl.searchParams.get(
			"id"
		) as string | undefined;

		// If the id is not specified, retrieve
		// the list of all the POIs
		if (!id) {
			// Todo: Add pagination in the list
			return await handleGetList(request);
		}

		return await handleGetDetail(request);
	} catch (error) {
		// Log the error to the console if the retrieving process fails
		console.log(error);

		// Return an error message to the client
		// if the deletion retrieving process fails
		return NextResponse.json(
			{
				error: "Internal server error",
			},
			{
				status: 500,
			}
		);
	}
}

const handleGetList = async (request: NextRequest): Promise<NextResponse> => {
	const result: Markers[] | null = await prisma.markers.findMany();

	return NextResponse.json(result, {
		status: 200,
	});
};

const handleGetDetail = async (request: NextRequest): Promise<NextResponse> => {
	const id: string = request.nextUrl.searchParams.get("id") as string;
	const result: Markers | null = await prisma.markers.findFirst({
		where: {
			id: id,
		},
	});

	return NextResponse.json(result, {
		status: 200,
	});
};
