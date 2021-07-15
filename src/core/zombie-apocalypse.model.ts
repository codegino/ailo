import { getUnits } from '../utils/world-map.util';
import { Coordinate, Tile, TileContent, WorldMap } from '../models/map.model';
import { MOVE_DIRECTION } from '../models/movement-direction.enum';
import { Creature, Zombie } from '../models/units.model';

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
    console.log(this.moves);
    console.log(log);
  }

  // private infectCreature(zombie: Tile, creatureCoordinate: Coordinate): void {
  // const newZombieCoordinate = move(
  //   creatureCoordinate,
  //   this.moves[this.currentMoveIndex],
  //   this.dimension,
  // );
  // this.logEvent(
  //   `zombie ${zombie.id} infected creature at (${creatureCoordinate.y},${creatureCoordinate.x})`,
  // );
  // const newZombie =
  //   this.worldMap[newZombieCoordinate.y][newZombieCoordinate.x];
  // newZombie.next = {
  //   unit: TileContent.ZOMBIE,
  //   id: this.nextZombieId,
  // };
  // this.logEvent(
  //   `new zombie ${this.nextZombieId} moved to (${newZombieCoordinate.y},${newZombieCoordinate.x})`,
  // );
  // this.nextZombieId++;
  // if (newZombie.content === TileContent.CREATURE) {
  //   this.infectCreature(
  //     {
  //       content: TileContent.ZOMBIE,
  //       coordinate: newZombieCoordinate,
  //       id: this.nextZombieId,
  //       next: null,
  //       units: [],
  //     },
  //     newZombieCoordinate,
  //   );
  // }
  // }

  private getTileByCoordinate(coordinate: Coordinate): Tile {
    return this.worldMap[coordinate.y][coordinate.x];
  }

  private mockMovement(): void {
    const zombies = getUnits(this.worldMap, TileContent.ZOMBIE) as Zombie[];
    zombies.forEach((z) => {
      const newCoordiante = z.mockMove(this.worldMap);

      if (newCoordiante) {
        const currentTile = this.getTileByCoordinate(z.coordinates);
        z.move(this.worldMap);
        currentTile.units = currentTile.units.filter(
          (_z: Zombie) => _z.id !== z.id,
        );
        const newTile = this.getTileByCoordinate(newCoordiante);
        newTile.units.push(z);
      }
    });
    // zombies.forEach((z) => {
    //   const newCoordinate = move(
    //     z,
    //     this.moves[this.currentMoveIndex],
    //     this.dimension,
    //   );
    //   const newTile = this.worldMap[newCoordinate.y][newCoordinate.x];
    //   const currentTile = this.worldMap[z.y][z.x];
    //   currentTile.next = currentTile?.next ?? {
    //     unit: TileContent.EMPTY,
    //     id: null,
    //   };
    //   newTile.next = { unit: TileContent.ZOMBIE, id: currentTile.id };
    //   // During chain infection
    //   if (newTile.content === TileContent.CREATURE) {
    //     this.infectCreature(currentTile, newCoordinate);
    //   } else if (
    //     newTile.content === TileContent.EMPTY ||
    //     newTile.content === TileContent.ZOMBIE
    //   ) {
    //     this.logEvent(
    //       `zombie ${currentTile.id} moved to (${newTile.coordinate.y},${newTile.coordinate.x})`,
    //     );
    //   }
    // });
  }

  private initiateUpdate(): void {
    // this.worldMap = this.worldMap.map((row) => {
    //   return row.map((tile) => ({
    //     ...tile,
    //     next: null,
    //     content: tile?.next?.unit ?? tile.content,
    //     id: tile?.next?.unit === TileContent.ZOMBIE ? tile.next.id : null,
    //   }));
    // });
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
    this.initiateUpdate();
  }
}