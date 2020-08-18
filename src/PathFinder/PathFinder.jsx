import React, { Component } from 'react';
import './PathFinder.css';
import Node from './Node/Node.jsx';
import dijkstra from '../Algorithms/Dijkstra.jsx';

class PathFinder extends Component {
    constructor() {
        super();
        this.state = {
            grid: [],
            mouseDown: false,
        };

        // this.handleMouseDown = this.handleMouseDown.bind(this);
        // this.handelMouseUp = this.handelMouseUp.bind(this);
        // this.handleMouseEnter = this.handleMouseEnter.bind(this);
        this.runAlgorithm = this.runAlgorithm.bind(this);
    }

    componentDidMount() {
        let grid = [];
        for(let i = 0; i < 20; i++) {
            let row = []
            for(let j = 0; j < 40; j++) {
                row.push({
                    'row': i,
                    'col': j,
                    'isWall': (i === 10 && j === 10),
                    'isStart': (i === 0 && j === 0),
                    'isEnd': (i === 19 && j === 39),
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

        this.setState({grid: grid})
        this.setState({startNode: startNode})
        this.setState({endNode: endNode})
        console.log(startNode);
    }

    handleMouseEnter(row, col) {
        if (this.state.mouseDown) {
            let newGrid = this.state.grid.slice();
            newGrid[row][col]['isWall'] = !newGrid[row][col]['isWall'];
            this.setState({grid: newGrid});
        }
    }

    handleMouseDown(row, col) {
        let newGrid = this.state.grid.slice();
        newGrid[row][col]['isWall'] = !newGrid[row][col]['isWall'];
        this.setState({grid: newGrid, mouseDown: true});
    }

    handelMouseUp() {
        this.setState({mouseDown: false});
    }

    runAlgorithm() {
        console.log('calling');
        dijkstra(this.state.grid, this.state.startNode, this.state.endNode);
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
                <button onClick={this.runAlgorithm}>
                    Dijkstra
                </button>
                <div className='grid' onMouseLeave={() => this.setState({mouseDown : false})}>
                    {screenGrid}
                </div>
            </div>
        );
    }
}

export default PathFinder;