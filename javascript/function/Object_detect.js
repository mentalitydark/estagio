import {Variables, change_variable} from "./../util/Variables.js";
let object_selected;
export function OD_render() {

}
export function OD_update(keys) {

}
export function object_detect(player, object) {
    const catX = player.centerX() - object.detectCenterX();
    const catY = player.centerY() - object.detectCenterY();
    const sumHalfWidth = player.halfWidth() + object.detectHalfWidth();
    const sumHalfHeight = player.halfHeight() + object.detectHalfHeight();
    if(Math.abs(catX) < sumHalfWidth && Math.abs(catY) < sumHalfHeight) {
        object_selected = object;
        return true;
    }
}