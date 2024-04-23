"use client";

import * as React from "react"

import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import DbMarker from "@/models/db-marker";
import useMapDataState, {MapDataState} from "@/states/map-data-state";

export function ScrollAreaDemo() {

    const markers: DbMarker[] = useMapDataState((state: MapDataState) => state.markers);

    return (
        <ScrollArea className="absolute m-10 h-[75vh] w-64 rounded-md border bg-black z-10">
            <div className="p-4">
                <h4 className="mb-4 text-sm font-medium text-white leading-none">Points</h4>
                {markers.map((marker) => (
                    <div key={marker.id}>
                        <div className="text-sm text-white">
                            {marker.name}
                        </div>
                        <Separator className="my-2" />
                    </div>
                ))}
            </div>
        </ScrollArea>
    )
}