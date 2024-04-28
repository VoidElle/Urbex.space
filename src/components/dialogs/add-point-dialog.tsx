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

import {ProfileForm} from "@/components/dialogs/profile-form";

interface Props {
    isShowing: boolean,
    onHide: () => void,
}

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
                        <ProfileForm />
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