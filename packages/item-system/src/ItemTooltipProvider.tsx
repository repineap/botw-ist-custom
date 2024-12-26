import { type PropsWithChildren, createContext, useRef, useState, useCallback, useEffect, useContext, useLayoutEffect, Suspense } from "react";
import { makeStyles, mergeClasses } from "@griffel/react";

import { useStaticAssetStyles } from "skybook-item-assets";

import type { ItemSlotInfo } from "./data/ItemSlotInfo.ts";
import { ItemTooltipContent } from "./ItemTooltipContent.tsx";

export type SetItemTooltipFn = (x: number, y: number, info: ItemSlotInfo | undefined) => void;

const useStyles = makeStyles({
    container: {
        position: "absolute",
    }
});

const ItemTooltipContext = createContext<SetItemTooltipFn>(() => {
    /* empty */
});

/** Provider for the ItemTooltipContext */
export const ItemTooltipProvider: React.FC<PropsWithChildren> = ({ children }) => {
    const staticAssets = useStaticAssetStyles();
    const styles = useStyles();

    const toolTipDivRef = useRef<HTMLDivElement>(null);
    const [tooltipInfo, setTooltipInfo] = useState<ItemSlotInfo | undefined>();
    const setTooltip: SetItemTooltipFn = useCallback(
        (x , y, info) => {
            if (!toolTipDivRef.current) {
                return;
            }
            const tooltipDiv = toolTipDivRef.current;
            if (info === undefined) {
                tooltipDiv.style.display = "none";
                return;
            }
            tooltipDiv.style.display = "unset";
            // This might initially be wrong the first time
            // the info is changed. However, most of the time, it will be
            // called again with the correct x and y when the mouse moves.
            positionTooltipDiv(tooltipDiv, x, y);
            setTooltipInfo(info);
        },
        [tooltipInfo],
    );

    return (
        <ItemTooltipContext.Provider value={setTooltip}>
            {children}
                <div
                    ref={toolTipDivRef}
                    className={mergeClasses(staticAssets.sheikahBg, styles.container)}
                >
                {tooltipInfo && <ItemTooltipContent info={tooltipInfo} />}
                </div>
        </ItemTooltipContext.Provider>
    );
};

const positionTooltipDiv = (tooltipDiv: HTMLDivElement, x: number, y: number) => {
    x += 10;
    y += 10;
    const oldX = x;
    const oldY = y;
    tooltipDiv.style.left = `${x}px`;
    tooltipDiv.style.top = `${y}px`;
    const rect = tooltipDiv.getBoundingClientRect();
    if (rect.bottom > window.innerHeight) {
        y -= rect.height + 20;
    }
    if (rect.right > window.innerWidth) {
        x -= rect.width + 20;
    }
    if (x < 0) {
        x = 0;
    }
    if (y < 0) {
        y = 0;
    }
    if (x !== oldX) {   
        tooltipDiv.style.left = `${x}px`;
    }
    if (y !== oldY) {
        tooltipDiv.style.top = `${y}px`;
    }
}

export const useSetItemTooltip = () => {
    return useContext(ItemTooltipContext);
}
