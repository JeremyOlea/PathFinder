import PriorityQueue from "js-priority-queue";

const dijkstra = (grid, start, end) => {
    console.log('dijkstra');
    let visited = new Set()
    let visitedOrder = [];
    let shortestPath = [];
    let pq = new PriorityQueue({
        comparator: function(a, b) {
            return a.distance - b.distance;
        }
    });

    grid[start['row']][start['col']]['distance'] = 0;

    // for(let i = 0; i < grid.length; i++) {
    //     for(let j = 0; j < grid[0].length; j++) {
    //         if(i == start.row && j == start.col) {
    //             grid[i][j]['distance'] = 0;
    //         } else {
    //             grid[i][j]['distance'] = Infinity;
    //         }
    //     }
    // }

    pq.queue(grid[start['row']][start['col']]);
    while(pq.length != 0) {
        let node = pq.dequeue();
        let row = node['row'];
        let col = node['col'];
        if(visited.has(node)) continue;
        visited.add(node);
        visitedOrder.push(node);

        const directions = [
            [1, 0],
            [0, 1],
            [-1, 0],
            [0, -1]
        ];
        for(let i = 0; i < directions.length; i++) {
            let rowDiff = directions[i][0];
            let colDiff = directions[i][1];
            let nextRow = row + rowDiff;
            let nextCol = col + colDiff;
            if(grid[nextRow]
                && grid[nextRow][nextCol]
                && !visited.has(grid[nextRow][nextCol])
                && !grid[nextRow][nextCol]['isWall']) 
                {
                    let newNode = grid[nextRow][nextCol];
                    if(newNode['isEnd']) {
                        visited.add(newNode);
                        visitedOrder.push(newNode);
                        shortestPath = getShortestPath(newNode);
                        return {visitedOrder, shortestPath};
                    }
                    let dist = 1;
                    if (node.distance + dist < grid[nextRow][nextCol].distance) {
                        grid[nextRow][nextCol]['prevNode'] = node;
                        grid[nextRow][nextCol]['distance'] = node.distance + dist;
                    }
                    pq.queue(grid[nextRow][nextCol]);
                }
        }
    }
    console.log('ending');
    return {visitedOrder, shortestPath};
}

const getShortestPath = (node) => {
    
}

export default dijkstra;