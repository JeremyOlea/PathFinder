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

        this.handleMouseDown = this.handleMouseDown.bind(this);
        this.handelMouseUp = this.handelMouseUp.bind(this);
    }

    componentDidMount() {
        let grid = [];
        for(let i = 0; i < 20; i++) {
            let row = []
            for(let j = 0; j < 40; j++) {
                row.push(0);
            }
            grid.push(row);
        }
        grid[0][0] = -1
        grid[19][39] = 1
        this.setState({grid: grid})
        console.log(grid);
    }

    handleMouseDown(event) {
        // event.preventDefault();
        let nodes = document.getElementsByClassName('node');
        console.log(nodes);
        // for(let i = 0; i < nodes.length; i++) {
        //     let node = nodes[i];
        //     node.setState({mouseDown : true})
        // }
    }

    handelMouseUp() {
        // event.preventDefault();
        // let nodes = document.getElementsByTagName('Node');
        // for(let i = 0; i < nodes.length; i++) {
        //     let node = nodes[i];
        //     node.setState({mouseDown : false})
        // }
    }

    render() {
        const screenGrid = []
        for(let i = 0; i < this.state.grid.length; i++) {
            for(let j = 0; j < this.state.grid[0].length; j++) {
                if(this.state.grid[i][j] == -1) screenGrid.push(<Node row={i} col={j} isStart={true}></Node>);
                else if(this.state.grid[i][j] == 1) screenGrid.push(<Node row={i} col={j} isEnd={true}></Node>);
                else screenGrid.push(<Node row={i} col={j}></Node>);
            }
        }
        return (
            <div className='grid' onMouseDown={this.handelMouseUp} onMouseUp={this.handleMouseDown}>
                {screenGrid}
            </div>
        );
    }
}

export default PathFinder;