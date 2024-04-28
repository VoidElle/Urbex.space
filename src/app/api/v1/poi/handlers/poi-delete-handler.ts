import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

interface Payload {
  id: string;
}

export async function PoiDeleteHandler(
  request: NextRequest,
): Promise<NextResponse> {
  const data: Payload = await request.json();

  // Error response if all the fields are not specified in the request
  if (!data.id) {
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
    // Trying to remove the marker from the database
    prisma.markers.delete({
      where: {
        id: data.id,
      },
    });

    // Return an empty body if the process is success
    return NextResponse.json(null, {
      status: 200,
    });
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
      },
    );
  }
}
