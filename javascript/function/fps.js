let oldTimeStamp;
export default function FPS(TimeStamp) {
    const seconds = (TimeStamp - oldTimeStamp) / 1000;
    oldTimeStamp = TimeStamp;
    return Math.round(1/seconds);
}