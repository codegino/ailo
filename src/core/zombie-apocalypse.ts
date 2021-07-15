import { getUnits } from '../utils/world-map.util';
import { Coordinate, Tile, TileContent, WorldMap } from '../models/map.model';
import { MOVE_DIRECTION } from '../models/movement-direction.enum';
import { Creature, Zombie } from '../models/units.model';
import { generateId } from '../utils/id-generator';

export class ZombieApocalypse {
  public nextZombieId: number;
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

    this.nextZombieId = getUnits(this.worldMap, TileContent.ZOMBIE).length + 1;
  }

  public logEvent(log: string): void {
    console.log(log);
  }

  public getTile(coordinate: Coordinate): Tile {
    return this.worldMap[coordinate.y][coordinate.x];
  }

  private mockMovement(): void {
    const zombies = getUnits(this.worldMap, TileContent.ZOMBIE) as Zombie[];
    zombies.forEach((z) => {
      const newCoordiante = z.mockMove(this.worldMap);

      if (newCoordiante) {
        const currentTile = this.getTile(z.coordinates);

        z.move(this.worldMap);
        currentTile.units = currentTile.units.filter(
          (_z: Zombie) => _z.id !== z.id,
        );
        const newTile = this.getTile(newCoordiante);
        newTile.units.push(z);

        const hasCreature = newTile.units.some((u) => u instanceof Creature);

        if (hasCreature) {
          // Convert infected to Zombie
          newTile.units = newTile.units.map((u) =>
            u instanceof Creature
              ? new Zombie(newTile.coordinate, generateId(), [...this.moves])
              : u,
          );
        }
      }
    });
  }

  public printMap(): void {
    let map = '';
    this.worldMap.forEach((row) => {
      const tiles = row
        .map((row) => {
          const creatureCount = row.units.filter(
            (r) => r instanceof Creature,
          ).length;
          const zombieCount = row.units.filter(
            (r) => r instanceof Zombie,
          ).length;

          const tile =
            creatureCount > 0 ? 'C' : zombieCount > 0 ? zombieCount : ' ';

          return `[${tile}]`;
        })
        .join('');
      map += tiles + '\n';
    });
    console.log(map);
  }

  public moveUnits(): void {
    this.mockMovement();
  }
}
