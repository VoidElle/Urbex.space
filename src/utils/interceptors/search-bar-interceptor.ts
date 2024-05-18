import { SearchbarAction } from "@/utils/constants/enums";
import { CurrentShowedDialog } from "@/states/dialogs-state";
import { CurrentShowedDrawer } from "@/states/drawers-state";

export interface Props {
	searchBarAction: SearchbarAction;

	showDialog: (currentShowedDialog: CurrentShowedDialog) => void;
	resetDialog: () => void;

	showDrawer: (currentShowedDrawer: CurrentShowedDrawer) => void;
	resetDrawer: () => void;
}

const interceptSearchbarItemClick = (props: Props): void => {
	console.log("Received value: " + props.searchBarAction);

	switch (props.searchBarAction) {
		case SearchbarAction.ADD_LOCATION:
			props.showDialog(CurrentShowedDialog.POI_ADD);
			break;
		case SearchbarAction.MANAGE_LOCATIONS:
			props.showDialog(CurrentShowedDialog.POI_MANAGER);
			break;
		case SearchbarAction.CHANGE_MAP_TYPE:
			props.showDrawer(CurrentShowedDrawer.CHANGE_MAP_STYLE);
			break;
	}
};

export { interceptSearchbarItemClick };
