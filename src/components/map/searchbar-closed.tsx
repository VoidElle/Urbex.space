"use client"

import * as React from "react"
import {Search} from "lucide-react"

import { Button } from "@/components/ui/button"
import {
    Command,
} from "@/components/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import {Searchbar} from "@/components/map/searchbar";


const SearchbarClosed = (): React.JSX.Element => {

    const [open, setOpen] = React.useState(false)

    return (
        <div className={"flex justify-center my-5"}>
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="h-10 w-14"
                >
                    <Search className="h-4 w-4 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[500px] p-0">
                <Command>
                    <Searchbar />
                </Command>
            </PopoverContent>
        </Popover>
        </div>
    );
}

export default SearchbarClosed;