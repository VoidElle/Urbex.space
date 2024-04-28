import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

interface Payload {
  userId: string;
  name: string;
  description: string;
  latitude: number;
  longitude: number;
}

export async function PoiPostHandler(
  request: NextRequest,
): Promise<NextResponse> {
  const data: Payload = await request.json();

  // Error response if all the fields are not specified in the request
  if (
    !data.userId ||
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
      },
    );
  }

  try {
    // Try to create a new marker inside the database
    const marker = await prisma.markers.create({
      data: {
        user_id: data.userId,
        name: data.name,
        description: data.description,
        latitude: data.latitude,
        longitude: data.longitude,
      },
    });

    // Return the id of the new marker if the process is successful
    return NextResponse.json(
      JSON.parse(
        JSON.stringify({
          id: marker.id,
        }),
      ),
      {
        status: 200,
      },
    );
  } catch (error) {
    // Log the error to the console if the creation process fails
    console.log(error);

    // Return an error message to the client
    // if the creation process fails
    return NextResponse.json(
      {
        error: "Internal server error",
      },
      {
        status: 500,
      },
    );
  }
}
