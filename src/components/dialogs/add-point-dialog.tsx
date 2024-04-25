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

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import tw from "tailwind-styled-components";
import {FormEvent} from "react";
import {Form} from "react-hook-form";

interface Props {
    isShowing: boolean,
    onHide: () => void,
}

const SingleItemOuterContainer = tw.div`
    grid 
    w-full 
    items-center 
    mt-4 
    gap-4
`;

const SingleItemInnerContainer = tw.div`
    flex 
    flex-col 
    space-y-1.5
`;

const DoubleItemOuterContainer = tw.div`
    flex 
    flex-col 
    mt-4 
    space-y-1 
    mb-8
`;

const DoubleItemInnerContainer = tw.div`
    w-full 
    flex 
    flex-row 
    gap-4
`;

export default function AddPointDialog(props: Props) {
    return (
        <AlertDialog
            open={props.isShowing}
            onOpenChange={props.onHide}
        >
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle className={"flex justify-center"}>Add a point</AlertDialogTitle>
                    <AlertDialogDescription>
                        <Form>

                            <SingleItemOuterContainer>
                                <SingleItemInnerContainer>
                                    <Label htmlFor="name">Name</Label>
                                    <Input id="name" placeholder="Name of the point"/>
                                </SingleItemInnerContainer>
                            </SingleItemOuterContainer>

                            <SingleItemOuterContainer>
                                <SingleItemInnerContainer>
                                    <Label htmlFor="description">Description</Label>
                                    <Input id="description" placeholder="Description of the point"/>
                                </SingleItemInnerContainer>
                            </SingleItemOuterContainer>

                            <DoubleItemOuterContainer>
                                <Label>Coordinates</Label>
                                <DoubleItemInnerContainer>
                                    <Input id="latitude" placeholder="Latitude" type={"number"}/>
                                    <Input id="longitude" placeholder="Longitude" type={"number"}/>
                                </DoubleItemInnerContainer>
                            </DoubleItemOuterContainer>

                        </Form>
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction type={"submit"}>Add</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}

async function handleSubmit(event: FormEvent<HTMLFormElement>): Promise<void> {

    console.log("CIAO");

    const formData: FormData = new FormData(event.currentTarget)
    console.log(formData);

}