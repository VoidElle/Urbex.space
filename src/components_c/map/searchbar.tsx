import {
    GearIcon,
    SewingPinIcon,
} from "@radix-ui/react-icons"

import {
    Command,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command"

export function Searchbar() {
    return (
        <Command className="rounded-lg border shadow-md">
            <CommandInput placeholder="Type a command or search..." />
            <CommandList>
                <CommandGroup heading="Location">
                    <CommandItem>
                        <SewingPinIcon className="mr-2 h-4 w-4" />
                        <span>Add a location</span>
                    </CommandItem>
                    <CommandItem>
                        <GearIcon className="mr-2 h-4 w-4" />
                        <span>Manage locations</span>
                    </CommandItem>
                </CommandGroup>
            </CommandList>
        </Command>
    )
}