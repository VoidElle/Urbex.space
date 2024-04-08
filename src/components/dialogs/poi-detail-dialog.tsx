"use client";

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import DbMarker from "@/models/db-marker";
import usePoiDetailDialogState, {PoiDetailDialogState} from "@/states/poi-detail-dialog-state";

import React from "react";

interface Props {
    isShowing: boolean,
    onHide: () => void,
}

export default function PoiDetailDialog(props: Props): React.JSX.Element {

    const marker: DbMarker | null = usePoiDetailDialogState((state: PoiDetailDialogState) => state.marker);
    if (marker == null) {
        props.onHide();
        return <></>;
    }

    return (
        <AlertDialog
            open={props.isShowing}
            onOpenChange={props.onHide}
        >
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Location details</AlertDialogTitle>
                    <AlertDialogDescription>
                        {marker.id} | {marker.name} -{">"} Longitude: {Number(marker.longitude)} | Latitude: {Number(marker.latitude)}
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={
                        () => openGoogleMaps(Number(marker.latitude), Number(marker.longitude))
                    }>Open on GMaps</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}

function openGoogleMaps(latitude: Number, longitude: Number) {
    window.open(`https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`, '_blank', 'noopener,noreferrer')
}