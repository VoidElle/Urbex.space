import {UserButton} from "@clerk/nextjs";
import React from "react";

export default function CustomUserButton() {
    return (
        <div className="absolute top-5 right-5 z-10">
            <UserButton appearance={{
                elements: {
                    avatarBox: "h-[48px] w-[48px]",
                }
            }}/>
        </div>
    );
}