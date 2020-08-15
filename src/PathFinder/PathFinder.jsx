import React, { Component } from 'react';
import './PathFinder.css';
import Node from './Node/Node.jsx';

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
    }

    componentDidMount() {
        let grid = [];
        for(let i = 0; i < 20; i++) {
            let row = []
            for(let j = 0; j < 40; j++) {
                row.push({
                    'row': i,
                    'col': j,
                    'isWall': (i == 10 && j == 10),
                    'isStart': (i == 0 && j == 0),
                    'isEnd': (i == 19 && j == 39),
                });
            }
            grid.push(row);
        }
        this.setState({grid: grid})
        console.log(grid);
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
            <div className='grid' onMouseLeave={() => this.setState({mouseDown : false})}>
                {screenGrid}
            </div>
        );
    }
}

export default PathFinder;