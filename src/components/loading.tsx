"use client";

import React from "react";
import { Icons } from "./Icon";
import useLoadingState, { LoadingState } from "@/states/loading-state";

export default function Loading(): React.JSX.Element {
    const isLoading: boolean = useLoadingState(
        (state: LoadingState) => state.loading
    );

    if (!isLoading) {
        return <></>;
    }

    return (
        <div
            className={
                "h-screen w-screen relative flex items-center justify-center bg-black opacity-80 z-50"
            }
        >
            <Icons.spinner className="h-20 w-20 animate-spin z-50 text-white" />
        </div>
    );
}
