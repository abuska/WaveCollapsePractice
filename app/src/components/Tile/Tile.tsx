import { useId } from "react";
import { TileType } from "../../models/models";
import { TILE_WIDTH, TILE_HEIGHT } from "../../utils/constants";



interface TileComponentProps{
    tile?: TileType;
}

export function TileComponent({ tile, }: TileComponentProps) {
    const id = useId();
    return (
        tile?.imageSrc ?
            <img
                key={id}
                src={require('../../assets/images/' + tile?.imageSrc)}
                style={{ width: TILE_WIDTH, height: TILE_HEIGHT, transform: `rotate(${tile.rotation * 90}deg)`, top: 0, left: 0, position: 'absolute',  }}
                alt={"" + id}
            />
            :
            <div style={{ width: TILE_WIDTH, height: TILE_HEIGHT, backgroundColor: 'red' }} key={id} />
        );
}