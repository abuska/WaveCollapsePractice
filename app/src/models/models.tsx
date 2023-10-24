
export type TileType = {
  index: number;
  imageSrc: string;
  edges: string[];
  up: Set<string>;
  right: Set<string>;
  down: Set<string>;
  left: Set<string>;
  rotation: number;
  
};

export type CellType = {
  index: number;
  collapsed: boolean;
  options: string[];
  tile?: TileType;
};




