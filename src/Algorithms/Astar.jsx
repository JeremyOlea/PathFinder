import PriorityQueue from "js-priority-queue";

const astar = (grid, start, end) => {
    let visited = new Set()
    let visitedOrder = [];
    let shortestPath = [];

    for(let i = 0; i < grid.length; i++) {
        for(let j = 0; j < grid[i].length; j++) {
            grid[i][j]['fScore'] = Infinity;
            grid[i][j]['gScore'] = Infinity;
            grid[i][j]['hScore'] = Infinity;
        }
    }

    let pq = new PriorityQueue({
        comparator: function(a, b) {
            if(a.fScore == b.fScore) return a.gScore - b.gScore;
            return a.fScore - b.fScore;
        }
    });

    grid[start['row']][start['col']].fScore = 0;
    grid[start['row']][start['col']].gScore = 0;
    grid[start['row']][start['col']].hScore = 0;

    pq.queue(grid[start['row']][start['col']]);
    while(pq.length != 0) {
        let node = pq.dequeue();
        let row = node['row'];
        let col = node['col'];
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
                    let g = node.gScore + dist;
                    if(g < newNode.gScore) {
                        newNode.gScore = g;
                        newNode.hScore = heuristic(newNode, end);
                        newNode.fScore = newNode.gScore + newNode.hScore;
                        newNode['prevNode'] = node;
                        pq.queue(newNode);
                    }
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

const heuristic = (nodeA, nodeB) => {
    return Math.abs(nodeA.row - nodeB.row) + Math.abs(nodeA.col - nodeB.col)
}

export default astar;