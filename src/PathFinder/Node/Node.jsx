import React, { Component } from 'react';
import './Node.css';

class Node extends Component{
    constructor(props) {
        super(props);
        this.state = {
            row: props.row,
            col: props.col,
            isWall: false,
            isStart: props.isStart != null ? props.isStart : false,
            isEnd: props.isEnd != null ? props.isEnd : false,
            mouseDown: false,
        };

        this.handleMouseOver = this.handleMouseOver.bind(this);
    }

    handleMouseOver(event) {
        event.preventDefault();
        if(!this.state.isStart && !this.state.isEnd && this.state.mouseDown) {
            this.setState({isWall : true});
        }
    }

    render() {
        let isStart = this.state.isStart;
        let isEnd = this.state.isEnd;
        let isWall = this.state.isWall;
        return(
            <div 
                className={`node ${isStart ? 'start' : ''} ${isEnd ? 'end' : ''} ${isWall ? 'wall' : ''}`}
                onMouseOver={this.handleMouseOver}
            >

            </div>
        );
    }

}

export default Node;