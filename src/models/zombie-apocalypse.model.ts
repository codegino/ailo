import { Coordinate, TileContent, WorldMap } from './map.model';
import { MOVE_DIRECTION } from './movement-direction.enum';

export class ZombieApocalypse {
  public currentMoveIndex = 0;

  constructor(
    public worldMap: WorldMap,
    private readonly moves: MOVE_DIRECTION[]
  ) {}

  public moveUnits() {
    if (this.currentMoveIndex === this.moves.length - 1) {
      this.currentMoveIndex = 0;
    } else {
      this.currentMoveIndex++;
    }
  }

  public getUnits(unit: TileContent) {
    const zombies: Coordinate[] = [];

    this.worldMap.forEach((row) => {
      row.forEach((tile) => {
        if (tile.content === unit) {
          zombies.push(tile.coordinate);
        }
      });
    });

    return zombies;
  }
}
