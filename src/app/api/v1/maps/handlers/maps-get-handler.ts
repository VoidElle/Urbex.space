import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { Maps } from "@prisma/client";

export async function MapsGetHandler(
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
		// Log the error to the console if the deletion process fails
		console.log(error);

		// Return an error message to the client
		// if the deletion process fails
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
	const result: Maps[] | null = await prisma.maps.findMany();
	console.log(result);

	return NextResponse.json(result, {
		status: 200,
	});
};

const handleGetDetail = async (request: NextRequest): Promise<NextResponse> => {
	const id: string = request.nextUrl.searchParams.get("id") as string;
	const result: Maps | null = await prisma.maps.findFirst({
		where: {
			id: id,
		},
	});
	console.log(result);

	return NextResponse.json(result, {
		status: 200,
	});
};
