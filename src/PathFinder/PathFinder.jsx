import React, { Component } from 'react';
import './PathFinder.css';
import Node from './Node/Node.jsx';
import dijkstra from '../Algorithms/Dijkstra.jsx';
import Navbar from '../Components/Toolbar/Navbar.jsx';

class PathFinder extends Component {
    constructor() {
        super();
        this.state = {
            grid: [],
            mouseDown: false,
            animating: false,
            animatingDone: false,
        };

        // this.handleMouseDown = this.handleMouseDown.bind(this);
        // this.handelMouseUp = this.handelMouseUp.bind(this);
        // this.handleMouseEnter = this.handleMouseEnter.bind(this);
        this.runAlgorithm = this.runAlgorithm.bind(this);
        this.initGrid = this.initGrid.bind(this);
        this.clearBoard = this.clearBoard.bind(this);
    }

    componentDidMount() {
        let {grid, startNode, endNode} = this.initGrid();
        this.setState({grid: grid});
        this.setState({startNode: startNode});
        this.setState({endNode: endNode});
    }

    initGrid() {
        let grid = [];
        for(let i = 0; i < 20; i++) {
            let row = []
            for(let j = 0; j < 40; j++) {
                row.push({
                    'row': i,
                    'col': j,
                    'isWall': false,
                    'isStart': (i === 7 && j === 10),
                    'isEnd': (i === 7 && j === 29),
                    'distance': Infinity,
                    'prevNode': null,
                });
            }
            grid.push(row);
        }
        let startNode;
        let endNode;
        for(let i = 0; i < 20; i++) {
            for(let j = 0; j < 40; j++) {
                let node = grid[i][j];
                if(node['isStart']) {
                    startNode = node;
                } else if(node['isEnd']) {
                    endNode = node;
                }
            }
        }

        return {grid, startNode, endNode};
    }

    handleMouseEnter(row, col) {
        if (this.state.mouseDown && !this.state.animating) {
            let newGrid = this.state.grid.slice();
            newGrid[row][col]['isWall'] = !newGrid[row][col]['isWall'];
            this.setState({grid: newGrid});
        }
    }

    handleMouseDown(row, col) {
        if(!this.state.animating) {
            let newGrid = this.state.grid.slice();
            newGrid[row][col]['isWall'] = !newGrid[row][col]['isWall'];
            this.setState({grid: newGrid, mouseDown: true});
        } else {
            this.setState({mouseDown: false});
        }
    }

    handelMouseUp() {
        this.setState({mouseDown: false});
    }

    runAlgorithm() {
        if(!this.state.animating) {
            let {visitedOrder, shortestPath} = dijkstra(this.state.grid, this.state.startNode, this.state.endNode);
            this.animateAlgorithm(visitedOrder, shortestPath)
        }
    }

    async animateAlgorithm(visitedOrder, shortestPath) {
        this.setState({animating: true});
        for(let i = 0; i < visitedOrder.length + shortestPath.length + 1; i++) {
            setTimeout(() => {
                if(i < visitedOrder.length) {
                    const node = visitedOrder[i];
                    let className = document.getElementById(`${node.row}-${node.col}`).className;
                    document.getElementById(`${node.row}-${node.col}`).className = className + ' visited';
                }
                else {
                    let shortest = shortestPath.slice();
                    while(shortest.length != 0) {
                        let node = shortest.pop();
                        let className = document.getElementById(`${node.row}-${node.col}`).className;
                        document.getElementById(`${node.row}-${node.col}`).className = className + ' shortestPath';
                    }
                    if(i == visitedOrder.length + shortestPath.length) {
                        this.setState({animatingDone: true});
                    }
                }
            }, 10 * i);
        }
    }

    clearBoard() {
        if(!this.state.animatingDone) return;
        this.setState({animatingDone : false});
        let {grid, startNode, endNode} = this.initGrid();
        this.setState({grid: grid});
        this.setState({startNode: startNode});
        this.setState({endNode: endNode});
        for(let i = 0; i < this.state.grid.length; i++) {
            for(let j = 0; j < this.state.grid[i].length; j++) {
                let isStart = grid[i][j]['isStart'];
                let isEnd = grid[i][j]['isEnd'];
                let isWall = grid[i][j]['isWall'];
                let node = grid[i][j];
                document.getElementById(`${node.row}-${node.col}`).className = `node ${isStart ? 'start' : ''} ${isEnd ? 'end' : ''} ${isWall ? 'wall' : ''}`
            }
        }
        this.setState({animating : false});
    }

    render() {
        let grid = this.state.grid;
        const screenGrid = []
        for(let i = 0; i < grid.length; i++) {
            for(let j = 0; j < grid[0].length; j++) {
                let node = grid[i][j];
                screenGrid.push(<Node 
                    row={node['row']} 
                    col={node['col']} 
                    isStart={node['isStart']}
                    isEnd={node['isEnd']}
                    isWall={node['isWall']}
                    onMouseDownFunc={(row, col) => this.handleMouseDown(row, col)}
                    onMouseUpFunc={() => this.handelMouseUp()}
                    onMouseEnterFunc={(row, col) => this.handleMouseEnter(row, col)}
                    ></Node>);
            }
        }
        return (
            <div>
                <Navbar></Navbar>
                <button onClick={this.runAlgorithm}>
                    Dijkstra
                </button>
                <button onClick={this.clearBoard}>
                    Clear
                </button>
                <div className='grid' onMouseLeave={() => this.setState({mouseDown : false})}>
                    {screenGrid}
                </div>
            </div>
        );
    }
}

export default PathFinder;