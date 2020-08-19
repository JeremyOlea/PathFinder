import PriorityQueue from "js-priority-queue";

const dijkstra = (grid, start, end) => {
    let visited = new Set()
    let visitedOrder = [];
    let shortestPath = [];
    let pq = new PriorityQueue({
        comparator: function(a, b) {
            return a.distance - b.distance;
        }
    });

    grid[start['row']][start['col']]['distance'] = 0;

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
                        newNode['prevNode'] = node;
                        shortestPath = getShortestPath(newNode);
                        return {visitedOrder, shortestPath};
                    }
                    let dist = 1;
                    if (node['distance'] + dist < newNode['distance']) {
                        newNode['prevNode'] = node;
                        newNode['distance'] = node.distance + dist;
                    }
                    pq.queue(grid[nextRow][nextCol]);
                }
        }
    }
    return {visitedOrder, shortestPath};
}

const getShortestPath = (node) => {
    let shortestPath = []
    let currNode = node
    while(currNode != null && !currNode['isStart']) {
        shortestPath.push(currNode);
        currNode = currNode['prevNode'];
    }
    shortestPath.push(currNode);
    return shortestPath;
}

export default dijkstra;