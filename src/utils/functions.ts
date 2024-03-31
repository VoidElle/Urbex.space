import {SearchbarAction} from "@/utils/enums";
import {CurrentShowedDialog} from "@/components/managers/dialogs-manager";
import {CurrentShowedDrawer} from "@/components/managers/drawers-manager";

export interface Props {

    searchBarAction: SearchbarAction,

    showDialog: (currentShowedDialog: CurrentShowedDialog) => void,
    resetDialog: () => void,

    showDrawer: (currentShowedDrawer: CurrentShowedDrawer) => void,
    resetDrawer: () => void,
}

const interceptSearchbarItemClick = (props: Props): void => {

    console.log("Received value: " + props.searchBarAction);

    switch (props.searchBarAction) {
        case SearchbarAction.ADD_LOCATION:
            props.showDialog(CurrentShowedDialog.ADD_POI);
            break;
        case SearchbarAction.MANAGE_LOCATIONS:
            // Todo:
            break;
        case SearchbarAction.CHANGE_MAP_TYPE:
            props.showDrawer(CurrentShowedDrawer.CHANGE_MAP_STYLE);
            break;
    }

};

export { interceptSearchbarItemClick };