import * as React from "react"

import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"

const tags = Array.from({ length: 120 }).map(
    (_, i, a) => `v1.2.0-beta.${a.length - i}`
)

export function ScrollAreaDemo() {
    return (
        <ScrollArea className="absolute m-10 h-[75vh] w-64 rounded-md border bg-black">
            <div className="p-4">
                <h4 className="mb-4 text-sm font-medium text-white leading-none">Points</h4>
                {tags.map((tag) => (
                    <div key={tag}>
                        <div className="text-sm text-white">
                            {tag}
                        </div>
                        <Separator className="my-2" />
                    </div>
                ))}
            </div>
        </ScrollArea>
    )
}