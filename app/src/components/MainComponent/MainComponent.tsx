import { useCallback, useEffect, useMemo, useState } from 'react';
import { BOARD_HEIGHT, BOARD_WIDTH, TILE_HEIGHT, TILE_WIDTH } from '../../utils/constants';
import { useMainComponent } from './MainComponent/useMainComponent';
import { TileComponent } from '../Tile/Tile';
import { relative } from 'path';

let renderCount = 0;



export function MainComponent() {
  const { tiles, grid, calcCells } = useMainComponent();

  console.log('renderCount', renderCount);
  renderCount++;


  const board = useMemo(() => {
    return (
      grid.map((row, rowIndex) =>
        <div key={'row' + rowIndex} style={{ display: 'flex', flexDirection: 'row' }}>

          {row.map((cell, index) =>
            <div key={'row'+index+rowIndex} style={{height: TILE_HEIGHT, width: TILE_WIDTH, position: 'relative'}}>
              <TileComponent tile={cell?.tile} key={cell?.tile?.index + " " + index} />
            </div>
          )}
        </div>
      )
      
    )
    }, [grid]);
   


  return (
    <div>
    
      <div key={'boardContainer'} style={{width: BOARD_WIDTH, height: BOARD_HEIGHT, backgroundColor: 'black' }}>
        {board}
      </div>
      <div style={{marginTop: 200}} />
    </div>
  );
}

