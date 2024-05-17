import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

interface Payload {
	id: string;
	name: string;
	description: string;
	latitude: number;
	longitude: number;
}

export async function PoiPutHandler(
	request: NextRequest
): Promise<NextResponse> {
	const data: Payload = await request.json();

	// Error response if all the fields are not specified in the body's request
	if (
		!data.id ||
		!data.name ||
		!data.description ||
		!data.latitude ||
		!data.longitude
	) {
		return NextResponse.json(
			{
				error: "Missing params",
			},
			{
				status: 400,
			}
		);
	}

	try {
		// Try to update the existing marker inside the database
		const marker = await prisma.markers.update({
			where: {
				id: data.id,
			},
			data: {
				name: data.name,
				description: data.description,
				latitude: data.latitude,
				longitude: data.longitude,
			},
		});

		// Return the id of the existing marker if the process is successful
		return NextResponse.json(
			JSON.parse(
				JSON.stringify({
					id: marker.id,
				})
			),
			{
				status: 200,
			}
		);
	} catch (error) {
		// Log the error to the console if the updating process fails
		console.log(error);

		// Return an error message to the client
		// if the updating process fails
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
