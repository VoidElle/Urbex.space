"use client";

import React from "react";

import { Dialog, DialogContent } from "@/components/ui/dialog";

interface Props {
	isShowing: boolean;
	onHide: () => void;
}

export default function PoiManagerDialog(props: Props): React.JSX.Element {
	return (
		<Dialog open={props.isShowing} onOpenChange={props.onHide}>
			<DialogContent className="sm:max-w-[825px]"></DialogContent>
		</Dialog>
	);
}
