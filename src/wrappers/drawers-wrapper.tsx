import React from "react";
import ChangeMapStyleDrawer from "@/components/drawers/change-map-style-drawer";
import useDrawers, {CurrentShowedDrawer, DrawersState} from "@/states/drawers-state";

const DrawersWrapper = (): React.JSX.Element => {

    const showedDrawer: CurrentShowedDrawer | undefined = useDrawers((state: DrawersState) => state.showedDrawer);
    const reset: () => void = useDrawers((state: DrawersState) => state.reset);

    return (
        <>

            <ChangeMapStyleDrawer
                isShowing={showedDrawer == CurrentShowedDrawer.CHANGE_MAP_STYLE}
                onHide={reset} />

        </>
    );
};

export default DrawersWrapper;