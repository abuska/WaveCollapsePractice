import { useCallback, useEffect, useMemo, useState } from "react";
import { CellType, TileType } from "../../../models/models";
import { DIMENSION, EDGES, TILE_COUNT, TILE_EXTENSION, TILE_PATH } from "../../../utils/constants";


interface UseMainComponentValues{
    tiles: TileType[];
    grid: CellType[][];
    calcCells: () => void;
    
}

export const useMainComponent = (): UseMainComponentValues => {

    // -- Init tile images 
    const tileImages = useMemo(() => {
        let images = [];
        for (let i = 0; i < TILE_COUNT; i++) {
            images.push(TILE_PATH + i + TILE_EXTENSION);
        }
        return images;
        

    }, []);
    
 
    function reverseString(s: string) {
        let arr = s.split("");
        arr = arr.reverse();
        return arr.join("");
    }

    function compareEdge(a: string, b: string) {
        return a == reverseString(b);
    }

    const analyzeTiles = useCallback((newTiles: TileType[], newTile: TileType, newTileIndex: number) => {
        newTile.up = new Set<string>();
        newTile.right = new Set<string>();
        newTile.down = new Set<string>();
        newTile.left = new Set<string>();
        let tilesConcat = [...newTiles, newTile]
        if (!tilesConcat.length) return newTile;
        for (let i = 0; i < tilesConcat.length; i++) {
            let tile = tilesConcat[i];
            // edge 0 - up, edge 1 - right, edge 2 - down, edge 3 - left
            // if the new tile is match another tile, add the index of the new tile to the matched tile
            // and add newTile index to the tile that matched with newTile

            // Tile 5 can't match itself
            //if (tile.index == 5 && newTile.index == 5) continue;
            // UP - compare tile DOWN
            if (compareEdge(tile.edges[2], newTile.edges[0])) {
                newTile.up.add(i.toString());
                tile.down.add(newTileIndex.toString());
            }
            // RIGHT - compare tile LEFT
            if (compareEdge(tile.edges[3], newTile.edges[1])) {
                newTile.right.add(i.toString());
                tile.left.add(newTileIndex.toString());
            }
            // DOWN - compare tile UP
            if (compareEdge(tile.edges[0], newTile.edges[2])) {
                newTile.down.add(i.toString());
                tile.up.add(newTileIndex.toString());
            }
            // LEFT - compare tile RIGHT
            if (compareEdge(tile.edges[1], newTile.edges[3])) {
                newTile.left.add(i.toString());
                tile.right.add(newTileIndex.toString());
            }
        }
        return newTile;
     }, []);

    const rotate = useCallback((tile: TileType, index: number) => {
        const newEdges = [];
        const length = tile.edges.length;

        for (let i = 0; i < length; i++) {
            newEdges[i] = tile.edges[(i - index + length) % length];
        }
        return { ...tile, edges: newEdges, index: index, rotation: index };
    }, []);

    const initTiles = useCallback(() => {
        let newTiles = [] as TileType[];
        for (let i = 0; i < TILE_COUNT; i++) {
            let newTile = {
                imageSrc: tileImages[i],
                edges: EDGES[i],
                index: i,
                up: new Set<string>(),
                right: new Set<string>(),
                down: new Set<string>(),
                left: new Set<string>(),
            } as TileType;
            
            newTile = analyzeTiles(newTiles, newTile, i);
            newTiles.push(newTile);
        } 
        
        const initialTileCount = TILE_COUNT;
       // let tempTiles = [];
        for (let i = 0; i < initialTileCount; i++) {
            // todo write back 4
            for (let j = 0; j <= 3; j++) {
                let rotatedTile = rotate(newTiles[i], j);
                rotatedTile.index = newTiles.length;
                
                // check if the rotated tile is already exist in the tiles array if not add it
                if (!newTiles.some((tile) => tile.edges.every((edge, index) => edge === rotatedTile.edges[index]))) {
                    
                    rotatedTile = analyzeTiles(newTiles, rotatedTile, rotatedTile.index);
                    newTiles.push(rotatedTile);
                }
            }
        }
        // add the rotated tiles to the tiles array
        //console.log('tempTiles', newTiles.concat(tempTiles));
        //newTiles = newTiles.concat(tempTiles);
        
        console.log('initTiles', newTiles);
        
        return newTiles;
    }, []);
    
    const [tiles, setTiles] = useState<TileType[]>(initTiles())
    
    // -- Init cells function
    const initCells = useCallback(() => {
        console.log('INIT CELLS')
        let cells = [] as CellType[];
        let options = [] as string[];
        for (let i = 0; i < tiles.length; i++) {
            options.push(i.toString());
        }
        for (let i = 0; i < DIMENSION * DIMENSION; i++) {
            cells.push({
                collapsed: false,
                options: options,
                tile: undefined,
                index: i,
            });
        }
        return cells;
    }, []);

    // -- Init cells -- cells are the actual tiles that are placed on the board
    const [cells, setCells] = useState<CellType[]>(initCells());

  

    function checkValid(arr: string[], valid: string[]) {
        console.log('arr', arr, 'valid', valid);
        for (let i = arr.length - 1; i >= 0; i--) {
            let element = arr[i];
            if (!valid.includes(element)) {
            arr.splice(i, 1);
            }
        }
    }

    const nextCells = useCallback((selectedCells: CellType[], cells: CellType[]) => { 
        console.log('selectedCells', selectedCells);

        let fullCellsCopy = [...cells];
        let newCells = [...selectedCells];
        console.log('newCells at next cells', newCells);
        
        for (let j = 0; j < DIMENSION; j++) { 
            for (let i = 0; i < DIMENSION; i++) { 
                
                let index = j * DIMENSION + i;

                let currentCell = newCells.find((cell) => cell.index === index);
                if (currentCell == undefined) continue;
                
                //console.log('-----INDEX-----', index);
                //console.log('index', index, 'cells[index]', newCells[index], 'options', newCells[index]?.options);
                //console.log('currentCell', currentCell);

                if (currentCell?.collapsed) {
                    fullCellsCopy[index] = currentCell;
                    console.log('fullCellsCopy[index]', fullCellsCopy[index])
                } else {

                    let options = [] as string[];
                    for (let i = 0; i < tiles.length; i++) {
                        options.push(i.toString());
                    }
                    
                    
                    let upCell = newCells.find((cell) => cell.index === (i + (j - 1) * DIMENSION))
                    if(upCell===undefined) upCell = fullCellsCopy[i + (j - 1) * DIMENSION];
                    
                    //console.log('upCell', upCell);



                    let rightCell = newCells.find((cell) => cell.index === (i + 1 + j * DIMENSION))
                    if (rightCell === undefined) rightCell = fullCellsCopy[i + 1 + j * DIMENSION];
                    
                    //console.log('rightCell', rightCell);



                    let downCell = newCells.find((cell) => cell.index === (i + (j + 1) * DIMENSION))
                    if (downCell === undefined) downCell = fullCellsCopy[i + (j + 1) * DIMENSION];

                    //console.log('downCell', downCell);



                    let leftCell = newCells.find((cell) => cell.index === (i - 1 + j * DIMENSION))
                    if (leftCell === undefined) leftCell = fullCellsCopy[i - 1 + j * DIMENSION];

                    //console.log('leftCell', leftCell);
                    
                    if (upCell != null && j > 0) {
                        let validOptions = [] as string[];
                        
                        for (let option of upCell.options) {
                           // console.log('upCell.options and index: ', upCell.index, tiles[Number(option)].down);
                        

                            let valid =[]as string[];
                            tiles[Number(option)].down.forEach((value: string) => valid.push(value));
                            validOptions = validOptions.concat(valid);

                           // console.log('validOptions', validOptions);
                        }
                        options = options.filter(element => validOptions.includes(element));
                    }
                    if (rightCell != null && i < DIMENSION - 1) {
                        let validOptions = [] as string[];
                        for (let option of rightCell.options) {
                           // console.log('right.options and index: ', rightCell.index, tiles[Number(option)].left);

                            let valid = [] as string[];
                            tiles[Number(option)].left.forEach((value: string) => valid.push(value));
                            validOptions = validOptions.concat(valid);

                            //console.log('validOptions', validOptions);
                        }
                        options = options.filter(element => validOptions.includes(element));
                    }
                    if (downCell != null && j < DIMENSION - 1) {
                        let validOptions = [] as string[];
                        for (let option of downCell.options) {
                           // console.log('down.options and index: ', downCell.index, tiles[Number(option)].up);

                            let valid = [] as string[];
                            tiles[Number(option)].up.forEach((value: string) => valid.push(value));
                            validOptions = validOptions.concat(valid);

                           // console.log('validOptions', validOptions);
                        }
                        options = options.filter(element => validOptions.includes(element));
                    }
                    if (leftCell != null && i > 0) {
                        let validOptions = [] as string[];
                        for (let option of leftCell.options) {
                          //  console.log('left.options and index: ', leftCell.index, tiles[Number(option)].right);

                            let valid = [] as string[];
                            tiles[Number(option)].right.forEach((value: string) => valid.push(value));
                            validOptions = validOptions.concat(valid);

                           // console.log('validOptions', validOptions);
                        }
                        options = options.filter(element => validOptions.includes(element));
                    }
                    //console.log('options', options);
                    currentCell.options = options;
                    fullCellsCopy[index] = currentCell;
                }
            }
        }
        console.log('newCells at the end of the nextCells', fullCellsCopy);
        //setCells(fullCellsCopy);
        return fullCellsCopy;
    }, []);

    const calcCells = useCallback(() => {

        // -- Filter cells that are not collapsed
        let cellsCopy = [...cells];
        cellsCopy = cellsCopy.filter((cell) => !cell.collapsed);
        if(cellsCopy[0] == undefined) return;
        
        // -- Sort cells by options length
        cellsCopy = cellsCopy.sort((a, b) => a.options.length - b.options.length);
        console.log('cellsCopy sorted', cellsCopy);

        let len = cellsCopy[0].options.length;
        let stopIndex = 0;

        // -- Find the first cell that has more than one option
        for (let i = 1; i < cellsCopy.length; i++) {
            if (cellsCopy[i].options.length!==0 && cellsCopy[i].options.length > len) {

                stopIndex = i;
                break;
            }
        }
        console.log('stopIndex', stopIndex);


        const randomCellIndex = Math.floor(Math.random() * stopIndex)
     

        console.log('Cell wit randomCellIndex', randomCellIndex, cellsCopy[randomCellIndex]);
        const pick = cellsCopy[randomCellIndex]?.options[Math.floor(Math.random() * cellsCopy[randomCellIndex].options.length)];
        
        if (pick == undefined) return;
        console.log('PickOption to', pick, tiles[parseInt(pick)]);
        
        cellsCopy[randomCellIndex].collapsed = true;
        cellsCopy[randomCellIndex].options = [pick];
        cellsCopy[randomCellIndex].tile = tiles[parseInt(pick)];

        console.log('cells to give nextCells', cellsCopy);
        let nextCellsState = nextCells(cellsCopy, cells);
        console.log('nextCellsState', nextCellsState);
        setCells(nextCellsState);   
     }, []);

    /*useEffect(() => { 
        calcCells(cells);
        console.log('cells', cells);
    }, [cells]);*/

    // -- Init grid -- grid purpose is to display the cells in a grid format
    // -- grid is calculated from cells 
    const [grid, setGrid] = useState<CellType[][]>([]);
    
    // -- Init grid after cells are set
    useEffect(() => { 
        if (!cells.length) return;
        
        let newGrid = [] as CellType[][];
        for (let i = 0; i < DIMENSION; i++){
            newGrid.push([]);
            for (let j = 0; j < DIMENSION; j++){
                newGrid[i].push(cells[i * DIMENSION + j]);
            }
        }

        setGrid(newGrid);
    }, [cells]);
  

    return {
        tiles,
        grid,
        calcCells,
  }
}

