import { useCallback, useEffect, useState } from 'react';
import { BOARD_HEIGHT, BOARD_WIDTH } from '../../utils/constants';
import { useMainComponent } from './MainComponent/useMainComponent';
import { TileComponent } from '../Tile/Tile';
import { relative } from 'path';

let renderCount = 0;



export function MainComponent() {
  const { tiles, grid, calcCells } = useMainComponent();

  console.log('renderCount', renderCount);
  renderCount++;


  const board = useCallback(() => {

    //console.table(grid.map((row) => row.map((cell) => 'collapsed: '+cell?.collapsed+" options: "+cell?.options.toString()+" imgSrc:"+cell?.tile?.imageSrc)));
    return (
      grid.map((row, rowIndex) =>
        <div key={'row' + rowIndex} style={{ display: 'flex', flexDirection: 'row' }}>

          {row.map((cell, index) =>
            <div key={'row'+index+rowIndex} style={{position: 'relative'}}>
              <TileComponent tile={cell?.tile} key={cell?.tile?.index + " " + index} />
              <div style={{position: 'absolute', top: 0, fontSize: 30, color: 'white'}} key={cell?.tile?.index + " " + index+'div'}  >{cell.index}</div>
            </div>
          )}
        </div>
      )
      
    )
    }, [grid]);
   


  return (
    <div>
      <div key={'boardContainer'} style={{width: BOARD_WIDTH, height: BOARD_HEIGHT, backgroundColor: 'black' }}>
        {board()}
      </div>
      <div style={{marginTop: 200}} />
      <div onClick={()=>calcCells()}>
        ClickToCalc
      </div>
    </div>
  );
}

