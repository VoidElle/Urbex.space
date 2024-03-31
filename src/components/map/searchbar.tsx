"use client";

import {
    GearIcon,
    SewingPinIcon,
} from "@radix-ui/react-icons"

import {
    Command,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList, CommandSeparator,
} from "@/components/ui/command"
import {MapIcon} from "lucide-react";
import {SearchbarAction} from "@/utils/enums";
import {CurrentShowedDialog, DialogsManagerState, useDialogsManager} from "@/components/dialogs/dialogs-manager";

export const Searchbar = () => {

    const showDialog: (currentShowedDialog: CurrentShowedDialog) => void = useDialogsManager((state: DialogsManagerState) => state.showDialog);

    return (
        <Command className="rounded-lg border shadow-md">
            <CommandInput placeholder="Choose an option..." />
            <CommandList>
                <CommandGroup heading="Location">
                    <CommandItem onSelect={(): void => {
                        showDialog(CurrentShowedDialog.ADD_POI);
                    }}>
                        <SewingPinIcon className="mr-2 h-4 w-4" />
                        <span>Add a location</span>
                    </CommandItem>
                    <CommandItem onSelect={() => elementSelected(SearchbarAction.MANAGE_LOCATIONS)}>
                        <GearIcon className="mr-2 h-4 w-4" />
                        <span>Manage locations</span>
                    </CommandItem>
                </CommandGroup>
                <CommandSeparator />
                <CommandGroup heading="Map">
                    <CommandItem onSelect={() => elementSelected(SearchbarAction.CHANGE_MAP_TYPE)}>
                        <MapIcon className="mr-2 h-4 w-4" />
                        <span>Change map type</span>
                    </CommandItem>
                </CommandGroup>
            </CommandList>
        </Command>
    );
}

const elementSelected = (searchbarAction: SearchbarAction) => {
    console.log("VALUE: " + searchbarAction);
};