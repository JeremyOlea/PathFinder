import React, { Component } from 'react';
import './PathFinder.css';

class PathFinder extends Component {
    constructor() {
        super();
        this.state = {
            grid: [],
        };
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
        this.setState({grid: grid})
        console.log(grid);
    }

    render() {
        return (
            <div className='grid'>
            {this.state.grid.map((row) => {
                return (
                    <div className='row'>
                    {row.map((val) => {
                        return(
                        <div className='node'></div>
                        );
                    })}
                    </div>
                );
            })}
            </div>
        );
    }
}

export default PathFinder;