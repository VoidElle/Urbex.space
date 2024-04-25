import {cookies} from "next/headers";
import {RequestCookie} from "next/dist/compiled/@edge-runtime/cookies";
import {ACCESS_CODE} from "@/utils/constants/constants";

export function parseSerializable(data: any): any {
    const jsonString: string = JSON.stringify(data);
    return JSON.parse(jsonString);
}

export function isUserAccessCodeValid(): boolean {

    const cookieStore = cookies();
    const retrievedCookieAccessCode: RequestCookie | undefined = cookieStore.get(ACCESS_CODE);

    const secretAccessCode: string | undefined = process.env.ACCESS_CODE;

    // console.log(`retrievedCookieAccessCode: ${retrievedCookieAccessCode?.value} | secretAccessCode: ${secretAccessCode}`);

    return retrievedCookieAccessCode != undefined && retrievedCookieAccessCode.value == secretAccessCode;
}