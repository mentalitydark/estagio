export let keyMap = {
    "escape": "escape",
    "enter": "enter",
    "o": "o",
    "p": "p"
};
export function changeKey(key, value) {
    keyMap[key] = value;
}