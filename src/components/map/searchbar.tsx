"use client";

import {GearIcon, SewingPinIcon,} from "@radix-ui/react-icons"

import {
    Command,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
} from "@/components/ui/command"

import { MapIcon } from "lucide-react";
import { SearchbarAction } from "@/utils/constants/enums";
import { interceptSearchbarItemClick } from "@/utils/interceptors/search-bar-interceptor";
import useDialogsState, { CurrentShowedDialog, DialogsState } from "@/states/dialogs-state";
import { CurrentShowedDrawer, DrawersState } from "@/states/drawers-state";
import useDrawersState from "@/states/drawers-state";
import {useEffect} from "react";

export const Searchbar = () => {

    const showDialog: (currentShowedDialog: CurrentShowedDialog) => void = useDialogsState((state: DialogsState) => state.showDialog);
    const resetDialog: () => void = useDialogsState((state: DialogsState) => state.reset);

    const showDrawer: (currentShowedDrawer: CurrentShowedDrawer) => void = useDrawersState((state: DrawersState) => state.showDrawer);
    const resetDrawer: () => void = useDrawersState((state: DrawersState) => state.reset);

    return (
        <Command className="rounded-lg border shadow-md">
            <CommandInput placeholder="Choose an option..." />
            <CommandList>
                <CommandGroup heading="Location">
                    <CommandItem onSelect={(): void => {
                        interceptSearchbarItemClick({
                            searchBarAction: SearchbarAction.ADD_LOCATION,
                            showDialog: showDialog,
                            resetDialog: resetDialog,
                            showDrawer: showDrawer,
                            resetDrawer: resetDrawer,
                        });
                    }}>
                        <SewingPinIcon className="mr-2 h-4 w-4" />
                        <span>Add a location</span>
                    </CommandItem>
                    <CommandItem onSelect={(): void => {
                        interceptSearchbarItemClick({
                            searchBarAction: SearchbarAction.MANAGE_LOCATIONS,
                            showDialog: showDialog,
                            resetDialog: resetDialog,
                            showDrawer: showDrawer,
                            resetDrawer: resetDrawer,
                        });
                    }}>
                        <GearIcon className="mr-2 h-4 w-4" />
                        <span>Manage locations</span>
                    </CommandItem>
                </CommandGroup>
                <CommandSeparator />
                <CommandGroup heading="Map">
                    <CommandItem onSelect={(): void => {
                        interceptSearchbarItemClick({
                            searchBarAction: SearchbarAction.CHANGE_MAP_TYPE,
                            showDialog: showDialog,
                            resetDialog: resetDialog,
                            showDrawer: showDrawer,
                            resetDrawer: resetDrawer,
                        });
                    }}>
                        <MapIcon className="mr-2 h-4 w-4" />
                        <span>Change map type</span>
                    </CommandItem>
                </CommandGroup>
            </CommandList>
        </Command>
    );
}