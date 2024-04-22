"use client";

import React from "react";

import { redirect } from 'next/navigation';
import {cookies} from "next/headers";

import {
    InputOTP,
    InputOTPGroup,
    InputOTPSeparator,
    InputOTPSlot,
} from "@/components/ui/input-otp";

import Icon from '@mdi/react';
import { mdiLockAlertOutline } from '@mdi/js';
import {ACCESS_CODE} from "@/utils/constants/constants";

export default function AccessPage(): React.JSX.Element {
    return (
        <div className={"flex flex-col bg-black text-white justify-center content-center h-[100vh] items-center"}>

            <div className={"mb-16 flex flex-col items-center justify-center content-center"}>
                <Icon
                    className={"mb-5"}
                    path={mdiLockAlertOutline}
                    size={2}
                />
                <h1 className={"text-2xl capitalize"}>Enter your Access code</h1>
            </div>

            <div className={"mb-32"}>
                <InputOTP onComplete={(code) => executeVerifyCode(code)} maxLength={6}>
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

        </div>
    );
}

function executeVerifyCode(code: string): void {
    console.log(code);
    cookies().set(ACCESS_CODE, code, { secure: true });
    redirect("/");
}