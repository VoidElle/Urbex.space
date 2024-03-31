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
import {DBMap} from "@/utils/constants/interfaces";

interface Props {
    isShowing: boolean,
    onHide: () => void,
}

const ChangeMapStyleDrawer = (props: Props) => {

    const mapsStyles: DBMap[] = useMapStyleState((state: MapStyleState) => state.maps);
    mapsStyles.map((mapStyle: DBMap) => {
        console.log(mapStyle);
    });

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
                                mapsStyles.map((mapStyle: DBMap) => {
                                    return (
                                        <div key={mapStyle.id} className="text-center">
                                            <Card>
                                                <CardContent className="flex aspect-square items-center justify-center p-6">

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
                    <Button>Submit</Button>
                        <DrawerClose asChild>
                            <Button variant="outline">Cancel</Button>
                        </DrawerClose>
                    </DrawerFooter>
                </div>
            </DrawerContent>
        </Drawer>
    )
}

export default ChangeMapStyleDrawer;