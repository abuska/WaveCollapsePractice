// -- GRID SETTINGS

export const DIMENSION = 20;
export const BOARD_WIDTH = 500;
export const BOARD_HEIGHT = 500;

// -- TILE DISPLAY

export const TILE_HEIGHT = BOARD_HEIGHT / DIMENSION;
export const TILE_WIDTH = BOARD_WIDTH / DIMENSION;

// -- TILE IMAGE SETTINGS

export const TILE_COUNT = 13;
export const TILE_PATH = 'circuit/';
export const TILE_EXTENSION = '.png';

// -- TILE EDGE SETTINGS
// 0 - up , 1 - right, 2 - down, 3 - left
export const EDGES = [
    ['AAA', 'AAA', 'AAA', 'AAA'], // 0
    ['BBB', 'BBB', 'BBB', 'BBB'], // 1
    ['BBB', 'BCB', 'BBB', 'BBB'], // 2
    ['BBB', 'BDB', 'BBB', 'BDB'], // 3
    ['ABB', 'BCB', 'BBA', 'AAA'], // 4
    ['ABB', 'BBB', 'BBB', 'BBA'], // 5
    ['BBB', 'BCB', 'BBB', 'BCB'], // 6
    ['BDB', 'BCB', 'BDB', 'BCB'], // 7
    ['BDB', 'BBB', 'BCB', 'BBB'], // 8
    ['BCB', 'BCB', 'BBB', 'BCB'], // 9
    ['BCB', 'BCB', 'BCB', 'BCB'], // 10
    ['BCB', 'BCB', 'BBB', 'BBB'], // 11
    ['BBB', 'BCB', 'BBB', 'BCB'], // 12

    
    
   // 0 - up , 1 - right, 2 - down, 3 - left
   
    /*    ["A", "A", "A", "A"], 
        ["A", "B", "B", "B"],
        ["B", 'A', 'B', 'B'],
        ["B", 'B', 'B', 'A'],
        ["B", 'B', 'A', 'B'],
    */
];


