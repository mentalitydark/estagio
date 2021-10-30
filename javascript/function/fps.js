import {Variables} from "./../util/Variables.js";
let oldTimeStamp;

function FPS(TimeStamp) {
    const seconds = (TimeStamp - oldTimeStamp) / 1000;
    oldTimeStamp = TimeStamp;
    return Math.round(1/seconds);
}
export default function FPS_draw(timeStamp) {
    const fpsText = FPS(timeStamp);
    Variables.context.fillStyle = "#fff";
    Variables.context.strokeStyle = "rgb(0, 0, 0)";
    Variables.context.lineWidth = 1.5;
    Variables.context.font = "10px Free Pixel";
    Variables.context.strokeText("FPS: "+ fpsText, 2, 10);
    Variables.context.stroke();
    Variables.context.fillText("FPS: "+ fpsText, 2, 10);
    Variables.context.fill();
}