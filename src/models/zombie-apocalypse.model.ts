import { move } from '../utils/movement';
import { getUnits } from '../utils/world-map.util';
import { TileContent, WorldMap } from './map.model';
import { MOVE_DIRECTION } from './movement-direction.enum';

export class ZombieApocalypse {
  public currentMoveIndex = 0;
  public readonly dimension: {
    height: number;
    width: number;
  };

  constructor(
    public worldMap: WorldMap,
    private readonly moves: MOVE_DIRECTION[],
  ) {
    this.dimension = {
      height: worldMap.length,
      width: worldMap[0].length,
    };
  }

  public log(log: string): void {
    console.log(log);
  }

  private mockMovement(): void {
    const zombies = getUnits(this.worldMap, TileContent.ZOMBIE);

    zombies.forEach((z) => {
      const newCoordinate = move(
        z,
        this.moves[this.currentMoveIndex],
        this.dimension,
      );

      const newTile = this.worldMap[newCoordinate.y][newCoordinate.x];
      const newCurrentTile = this.worldMap[z.y][z.x];

      newCurrentTile.next = newCurrentTile?.next ?? TileContent.EMPTY;
      newTile.next = TileContent.ZOMBIE;

      if (newTile.content === TileContent.CREATURE) {
        const newZombieCoordinate = move(
          newCoordinate,
          this.moves[this.currentMoveIndex],
          this.dimension,
        );

        this.log(
          `zombie infected creature at (${newTile.coordinate.y},${newTile.coordinate.x})`,
        );

        this.worldMap[newZombieCoordinate.y][newZombieCoordinate.x].next =
          TileContent.ZOMBIE;
      } else if (
        newTile.content === TileContent.EMPTY ||
        newTile.content === TileContent.ZOMBIE
      ) {
        this.log(
          `zombie moved to (${newTile.coordinate.y},${newTile.coordinate.x})`,
        );
      }
    });
  }

  private initiateMovement(): void {
    this.worldMap = this.worldMap.map((row) => {
      return row.map((tile) => ({
        ...tile,
        next: null,
        content: tile?.next ?? tile.content,
      }));
    });
  }

  public printMap(): void {
    let map = '';
    this.worldMap.forEach((row) => {
      const tiles = row
        .map((row) => {
          const tile =
            row.content === TileContent.CREATURE
              ? 'C'
              : row.content === TileContent.ZOMBIE
              ? 'Z'
              : ' ';

          return `[${tile}]`;
        })
        .join('');

      map += tiles + '\n';
    });
    console.log(map);
  }

  public moveUnits(): void {
    this.mockMovement();
    this.initiateMovement();

    if (this.currentMoveIndex === this.moves.length - 1) {
      this.currentMoveIndex = 0;
    } else {
      this.currentMoveIndex++;
    }
  }
}
