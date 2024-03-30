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

interface Props {
    open: boolean,
    onOpenChange: any,
}

export const Searchbar = (props: Props) => {
    return (
        <Command className="rounded-lg border shadow-md">
            <CommandInput placeholder="Choose an option..." />
            <CommandList>
                <CommandGroup heading="Location">
                    <CommandItem onSelect={() => {

                        // eslint-disable-next-line react-hooks/rules-of-hooks
                        // show();

                    }}>
                        <SewingPinIcon className="mr-2 h-4 w-4" />
                        <span>Add a location</span>
                    </CommandItem>
                    <CommandItem onSelect={() => elementSelected(props, SearchbarAction.MANAGE_LOCATIONS)}>
                        <GearIcon className="mr-2 h-4 w-4" />
                        <span>Manage locations</span>
                    </CommandItem>
                </CommandGroup>
                <CommandSeparator />
                <CommandGroup heading="Map">
                    <CommandItem onSelect={() => elementSelected(props, SearchbarAction.CHANGE_MAP_TYPE)}>
                        <MapIcon className="mr-2 h-4 w-4" />
                        <span>Change map type</span>
                    </CommandItem>
                </CommandGroup>
            </CommandList>
        </Command>
    );
}

const elementSelected = (props: Props, searchbarAction: SearchbarAction) => {
    console.log("VALUE: " + searchbarAction);
};