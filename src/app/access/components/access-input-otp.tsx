"use client";

import React from "react";
import {InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot} from "@/components/ui/input-otp";
import {redirect} from "next/navigation";
import {Cookies, useCookies} from "next-client-cookies";
import {ACCESS_CODE} from "@/utils/constants/constants";

export default function AccessInputOtp(): React.JSX.Element {

    const cookies: Cookies = useCookies();

    return (
        <div className={"mb-32"}>
            <InputOTP onComplete={(code) => {

                cookies.set(ACCESS_CODE, code, { secure: true });
                console.log(`Saved code: ${code}`);

                redirect("/");

            }} maxLength={6}>
                <InputOTPGroup>
                    <InputOTPSlot index={0}/>
                    <InputOTPSlot index={1}/>
                    <InputOTPSlot index={2}/>
                </InputOTPGroup>
                <InputOTPSeparator/>
                <InputOTPGroup>
                    <InputOTPSlot index={3}/>
                    <InputOTPSlot index={4}/>
                    <InputOTPSlot index={5}/>
                </InputOTPGroup>
            </InputOTP>
        </div>
    );
}