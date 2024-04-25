import React from "react";

import Icon from '@mdi/react';
import AccessInputOtp from "@/app/access/components/access-input-otp";

import { mdiLockAlertOutline } from '@mdi/js';
import { isUserAccessCodeValid } from "@/utils/functions/functions";
import {redirect} from "next/navigation";
import {Routes} from "@/utils/routes";

export default function AccessPage(): React.JSX.Element {

    const accessCodeValid: boolean = isUserAccessCodeValid();
    if (accessCodeValid) {
        redirect(Routes.MAP);
    }

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

            <AccessInputOtp />

        </div>
    );
}