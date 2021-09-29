/* eslint-disable no-import-assign */
/* eslint-disable no-undef */
import * as GLOBAL from "../util/global.js";
export default function LoadHandler(item) {
    GLOBAL.loadedAssets++;
    if (loadedAssets === assetsToLoad.length) {
        item.removeEventListener("load", LoadHandler);
        GLOBAL.gameState = 2;
    }
}