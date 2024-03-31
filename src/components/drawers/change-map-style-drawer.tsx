"use client";

import {
    Drawer,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
} from "@/components/ui/drawer";
import {Button} from "@/components/ui/button";

interface Props {
    isShowing: boolean,
    onHide: () => void,
}

const ChangeMapStyleDrawer = (props: Props) => {
    console.log("Ciao2 => " + props.isShowing);
    return (
        <Drawer
            open={props.isShowing}
            onClose={props.onHide}
        >
            <DrawerContent>
                <DrawerHeader>
                    <DrawerTitle>Are you absolutely sure?</DrawerTitle>
                    <DrawerDescription>This action cannot be undone.</DrawerDescription>
                </DrawerHeader>
                <DrawerFooter>
                    <Button>Submit</Button>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    );
};

export default ChangeMapStyleDrawer;