// -- GRID SETTINGS

export const DIMENSION = 20;
export const BOARD_WIDTH = 500;
export const BOARD_HEIGHT = 500;

// -- TILE DISPLAY

export const TILE_HEIGHT = BOARD_HEIGHT / DIMENSION;
export const TILE_WIDTH = BOARD_WIDTH / DIMENSION;

// -- TILE IMAGE SETTINGS

export const TILE_COUNT = 15;
export const TILE_PATH = 'island/';
export const TILE_EXTENSION = '.jpg';

// -- TILE EDGE SETTINGS
// 0 - up , 1 - right, 2 - down, 3 - left
export const EDGES = [
    ['AAA', 'AAA', 'AAA', 'AAA'], // 0
    ['ABA', 'AAA', 'AAA', 'AAA'], // 1
    ['ABA', 'ABA', 'AAA', 'AAA'], // 2
    ['ACD', 'DCA', 'AAA', 'AAA'], // 3
    ['ABA', 'AAA', 'ABA', 'AAA'], // 4
    ['ABA', 'ABA', 'ABA', 'AAA'], // 5
    ['ACD', 'DCA', 'ABA', 'AAA'], // 6
    ['ABA', 'ACD', 'DCA', 'AAA'], // 7
    ['ACD', 'DDD', 'DCA', 'AAA'], // 8
    ['ABA', 'ABA', 'ABA', 'ABA'], // 9
    ['ACD', 'DCA', 'ABA', 'ABA'], // 10
    ['ACD', 'DDD', 'DCA', 'ABA'], // 11
    ['ACD', 'DCA', 'ACD', 'DCA'], // 12
    ['ACD', 'DDD', 'DDD', 'DCA'], // 13
    ['DDD', 'DDD', 'DDD', 'DDD'], // 14
]   

/* 
kek - A,
hid - B,
fold - C,
fu - D,
*/

/* Circuit:
    [
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
];
*/


// 0 - up , 1 - right, 2 - down, 3 - left
    /*  
        demo:[
            ["A", "A", "A", "A"], 
            ["A", "B", "B", "B"],
            ["B", 'A', 'B', 'B'],
            ["B", 'B', 'B', 'A'],
            ["B", 'B', 'A', 'B'],
        ]
    */


