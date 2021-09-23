"use strict";
// const
const canvas = document.querySelector("#canvas");
const context = canvas.getContext("2d");
// -----------
// let
let oldTimeStamp;
// -----------
// resources
// -----------
document.addEventListener("DOMContentLoaded", () => {
    window.requestAnimationFrame(gameLoop);
});
function gameLoop(timeStamp) {
    window.requestAnimationFrame(gameLoop, canvas);
    update();
    render(timeStamp);
}
function update() {

}
function render(timeStamp) {
    // FPS
    const seconds = (timeStamp - oldTimeStamp) / 1000;
    oldTimeStamp = timeStamp;
    const fps = Math.round(1/seconds);
    // -----------
    context.save();
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.fillRect(590, 310, 50, 50);
    context.restore();
    // FPS Render
    context.fillStyle = "#383838";
    context.font = "25px Arial";
    context.fillText("FPS: "+ fps, 10, 30);
    // ----------
}
