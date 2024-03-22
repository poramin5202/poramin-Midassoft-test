function quickestPath(board: { ladders: [number, number][]; snakes: [number, number][]; }): number[] {
    const ladders = new Map(board.ladders);
    const snakes = new Map(board.snakes);
    const queue: [number, number[]][] = [[1, []]];
    const visited = new Set<number>();
  
    while (queue.length > 0) {
      const [currentPos, moves] = queue.shift()!;
  
      if (currentPos === 100) {
        return moves;
      }
  
      if (visited.has(currentPos)) {
        continue;
      }
  
      visited.add(currentPos);
  
      for (let i = 1; i <= 6; i++) {
        let nextPos = currentPos + i;
  
        if (nextPos > 100) {
          nextPos = 200 - nextPos;
        }
  
        if (ladders.has(nextPos)) {
          nextPos = ladders.get(nextPos)!;
        } else if (snakes.has(nextPos)) {
          nextPos = snakes.get(nextPos)!;
        }
  
        queue.push([nextPos, [...moves, i]]);
      }
    }
  
    return [];
  }

    