import World from "./../../class/World.js";
import Block from "./../../class/Block.js";
import {addToLoad} from "./../../function/LoadAssets.js";

const background = new Image();
background.src = "./img/world/Mapa.png";
addToLoad(background);

const village_limits = [
    new Block(1693, 1149, 2000, 1149),
    new Block(1693, 1151, 1693, 1328),
    new Block(1693, 1328, 1759, 1328),
    new Block(1693, 1373, 1759, 1373),
    new Block(1693, 1373, 1693, 1500),
    new Block(1693, 1494, 1707, 1494),
    new Block(1707, 1488, 1717, 1488),
    new Block(1724, 1483, 1736, 1483),
    new Block(1736, 1479, 1748, 1479),
    new Block(1748, 1485, 1760, 1485),
    new Block(1760, 1481, 1771, 1481),
    new Block(1771, 1490, 1784, 1490),
    new Block(1784, 1485, 1802, 1485),
    new Block(1802, 1481, 1814, 1481),
    new Block(1814, 1488, 1825, 1488),
    new Block(1825, 1484, 1843, 1484),
    new Block(1843, 1488, 1853, 1488),
    new Block(1853, 1483, 1862, 1483),
    new Block(1862, 1485, 1882, 1485),
    new Block(1882, 1481, 1890, 1481),
    new Block(1890, 1457, 1890, 1481),
    new Block(1890, 1457, 1933, 1457),
    new Block(1933, 1458, 1933, 1484),
    new Block(1933, 1484, 1987, 1484),
    new Block(1987, 1151, 1987, 1265),
    new Block(1985, 1265, 1985, 1283),
    new Block(1987, 1283, 1987, 1295),
    new Block(1987, 1302, 1987, 1335),
    new Block(1985, 1335, 1985, 1347),
    new Block(1984, 1353, 1984, 1419),
    new Block(1989, 1420, 1989, 1429),
    new Block(1984, 1429, 1984, 1449),
    new Block(1985, 1450, 1985, 1469),
    new Block(1987, 1470, 1987, 1484),
];
const village_houses = [
    new Block(1701, 1152, 1761, 1181),
    new Block(1888, 1210, 1967, 1248),
    new Block(1882, 1217, 1888, 1236),
    new Block(1745, 1274, 1806, 1312),
    new Block(1888, 1367, 1967, 1408),
    new Block(1728, 1423, 1807, 1456),
    new Block(1807, 1442, 1817, 1456),
];
const village_doors = [
    new Block(1733, 1181, 1745, 1181, "home_master", false, "door"),
];
const village_decoration = [
    new Block(1858, 1265, 1869, 1277),
    new Block(1877, 1288, 1898, 1305),
    new Block(1955, 1315, 1964, 1324),
];

const blocks = [
    ...village_limits,
    ...village_houses,
    ...village_decoration,
    ...village_doors,
];
export const main = new World("main", 2000, 1500, background, {x: 1930, y: 1415});
main.add_blocks(blocks);