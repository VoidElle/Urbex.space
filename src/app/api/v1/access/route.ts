import { NextResponse } from "next/server";
import {NextApiRequest} from "next";

interface Body {
    accessCode: string;
}

async function streamToString(stream: any): Promise<string> {

    const chunks: any[] = [];
    for await (const chunk of stream) {
        chunks.push(chunk);
    }

    return Buffer.concat(chunks).toString('utf8');
}

export async function POST(request: NextApiRequest): Promise<NextResponse> {

    const data: string = await streamToString(request.body);
    const dataParsed: Body = JSON.parse(data);

    const accessCode: string = dataParsed.accessCode;
    const secretAccessCode: string | undefined = process.env.ACCESS_CODE;

    if (accessCode != secretAccessCode) {
        return NextResponse.json({},
            {
                status: 401,
            }
        );
    } 

    return NextResponse.json({},
        {
            status: 200,
        }
    );
}