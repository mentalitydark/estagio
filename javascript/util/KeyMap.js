export let keyMap = {
    "escape": "escape",
    "enter": "enter"
};
export function changeKey(key, value) {
    keyMap[key] = value;
}