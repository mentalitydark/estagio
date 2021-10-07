export let assetsToLoad = [];
export let loadedAssets = 0;

export function addToLoad(img) {
    assetsToLoad.push(img);
}
export function loadEvent() {
    assetsToLoad.map( async a => {
        if(a.src !== undefined) {
            a.onload = () => {
                loadedAssets++;
            };
        } else {
            await a.load();
            loadedAssets++;
        }
    });
}