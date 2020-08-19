import React, { Component } from 'react';
import './Navbar.css';
import { AppBar, Toolbar, Button, Typography } from '@material-ui/core';
import { Radio, RadioGroup, FormControlLabel, FormControl, FormLabel } from '@material-ui/core/';
import { Select, InputLabel } from '@material-ui/core/';

const styles = theme => {
    root: {
       borderBottom: '1px solid white',
    },
    icon: {
       fill: 'white',
    },
}

class Navbar extends Component {

    handleChange(event) {
        console.log('changed');
    }

    render() {
        return(
            <div>
                <AppBar>
                    <Toolbar className='main-container'>
                        <Typography variant='h6'>
                            PathFinder Visualizer
                        </Typography>

                    {/* Drop Down */}
                        <div className='drop-down'>
                            <FormControl>
                                <InputLabel htmlFor="algorithm-native-simple">Algorithm</InputLabel>
                                <Select
                                native
                                onChange={this.handleChange}
                                inputProps={{
                                    name: 'Algorithm',
                                    id: 'algorithm-native-simple',
                                }}
                                >
                                <option value={"Dijkstra"}>Dijkstra</option>
                                </Select>
                            </FormControl>
                        </div>

                    {/* Bullet Select */}
                        <div className='radio-buttons'>
                            <FormControl component="fieldset">
                                <RadioGroup row aria-label="position" name="position" defaultValue="top">
                                    <FormControlLabel
                                        value="Place Walls"
                                        control={<Radio color="default" />}
                                        label="Place Walls"
                                        labelPlacement="end"
                                    />
                                    <FormControlLabel
                                        value="Remove Walls"
                                        control={<Radio color="default" />}
                                        label="Remove Walls"
                                        labelPlacement="end"
                                    />
                                    <FormControlLabel
                                        value="Move Start"
                                        control={<Radio color="default" />}
                                        label="Move Start"
                                        labelPlacement="end"
                                    />
                                    <FormControlLabel
                                        value="Move End"
                                        control={<Radio color="default" />}
                                        label="Move End"
                                        labelPlacement="end"
                                    />
                                </RadioGroup>
                            </FormControl>
                        </div>

                    {/* Buttons */}
                        <div className='button-row'>
                            <Button variant="contained" color='secondary'>
                                Visualize
                            </Button>
                            <div className='spacing'></div>
                            <Button variant="contained" color='secondary'>
                                Clear
                            </Button>
                        </div>
                    </Toolbar>
                </AppBar>
            </div>
        )
    }
}

export default Navbar;

