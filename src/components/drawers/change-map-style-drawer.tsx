"use client";

import * as React from "react"

import { Button } from "@/components/ui/button"
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"
import useMapStyleState, {MapStyleState} from "@/states/map-style-state";
import {Card} from "antd";
import {CardContent} from "@/components/ui/card";

import Image from "next/image";
import {useEffect, useState} from "react";
import {getLocalStorageMapStyleId, saveLocalStorageMapStyleId} from "@/utils/functions/local-storage-functions";
import DbMap from "@/models/db-map";

interface Props {
    isShowing: boolean,
    onHide: () => void,
}

const ChangeMapStyleDrawer = (props: Props) => {

    const mapsStyles: DbMap[] = useMapStyleState((state: MapStyleState) => state.maps);
    const changeStyle: (i: number) => void = useMapStyleState((state: MapStyleState) => state.changeStyle);

    mapsStyles.map((mapStyle: DbMap) => {
        console.log(mapStyle);
    });

    const [selectedMapId, setSelectedMapId] = useState("");

    useEffect((): void => {
        const getSelectedMapId: string = getLocalStorageMapStyleId();
        setSelectedMapId(getSelectedMapId);
    }, []);

    const saveSelectedMapId: (value: string) => void = (value: string) => saveLocalStorageMapStyleId(value);

    return (
        <Drawer
            open={props.isShowing}
            onClose={props.onHide}
        >
            <DrawerContent>
                <div className="mx-auto w-full max-w-sm">
                    <DrawerHeader>
                        <DrawerTitle>Map style</DrawerTitle>
                        <DrawerDescription>Select the style you prefer</DrawerDescription>
                    </DrawerHeader>
                    <div className="p-4 pb-0">
                        <div className="flex items-center justify-center space-x-2">
                            {
                                mapsStyles.map((mapStyle: DbMap) => {
                                    return (
                                        <div key={mapStyle.id} className="text-center" onClick={(): void => {

                                            setSelectedMapId(mapStyle.id);
                                            saveSelectedMapId(mapStyle.id);

                                            props.onHide();

                                            changeStyle(Number(mapStyle.id));

                                        }}>
                                            <Card styles={{
                                                body: selectedMapId == mapStyle.id
                                                    ? {
                                                        padding: "8px",
                                                        borderRadius: "8px",
                                                        border: "2px solid #000000",
                                                      }
                                                    : {},
                                            }}>
                                                <CardContent className="m-0 p-0 flex aspect-square">
                                                    <Image
                                                        src={mapStyle.imageUrl}
                                                        width={750}
                                                        height={750}
                                                        alt="Placeholder"
                                                    />
                                                </CardContent>
                                            </Card>
                                            <span className="text-xs text-muted-foreground">
                                                {mapStyle.name}
                                            </span>
                                        </div>
                                    );
                                })
                            }
                        </div>
                    </div>
                    <DrawerFooter>

                    <Button onClick={(): void => {
                        props.onHide();
                    }}>Undo</Button>

                    </DrawerFooter>
                </div>
            </DrawerContent>
        </Drawer>
    )
}

export default ChangeMapStyleDrawer;