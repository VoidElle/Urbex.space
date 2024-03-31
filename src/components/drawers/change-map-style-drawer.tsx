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

interface Props {
    isShowing: boolean,
    onHide: () => void,
}

const ChangeMapStyleDrawer = (props: Props) => {

    const changeStyle: () => void = useMapStyleState((state: MapStyleState) => state.change);

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
                            <Card>
                                <CardContent className="flex aspect-square items-center justify-center p-6">
                                    <span className="text-4xl font-semibold">
                                        T
                                    </span>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardContent className="flex aspect-square items-center justify-center p-6">
                                    <span className="text-4xl font-semibold">
                                        T2
                                    </span>
                                </CardContent>
                            </Card>
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