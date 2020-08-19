import React, { Component } from 'react';
import './Node.css';

class Node extends Component{
    constructor(props) {
        super(props);
        this.state = {
            row: props.row,
            col: props.col,
            onMouseDown: props.onMouseDownFunc,
            onMouseUp: props.onMouseUpFunc,
            onMouseEnter: props.onMouseEnterFunc,
        };
    }

    render() {
        let isStart = this.props.isStart;
        let isEnd = this.props.isEnd;
        let isWall = this.props.isWall;
        let row = this.state.row;
        let col = this.state.col;
        return(
            <button 
                id={`${row}-${col}`}
                className={`node ${isStart ? 'start' : ''} ${isEnd ? 'end' : ''} ${isWall ? 'wall' : ''}`}
                onMouseDown={() => this.state.onMouseDown(row, col)}
                onMouseEnter={() => this.state.onMouseEnter(row, col)}
                onMouseUp={() => this.state.onMouseUp()}
            >

            </button>
        );
    }

}

export default Node;