import React, { Component } from 'react';
import './Navbar.css';
import { AppBar, Toolbar, Button, Typography } from '@material-ui/core';
import { Radio, RadioGroup, FormControlLabel, FormControl, FormLabel } from '@material-ui/core/';
import { Select, InputLabel } from '@material-ui/core/';
import { makeStyles, styled } from '@material-ui/core/styles';

const MySelect = styled(Select)({
    color: 'black',
})

const MyOption = styled(Option)({
    color: 'black',
})

const MyInputLabel = styled(InputLabel)({
    color: 'white',
})

class Navbar extends Component {

    useStyles() {
        makeStyles({
            root: {
              background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
              border: 0,
              borderRadius: 3,
              boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
              color: 'white',
              height: 48,
              padding: '0 30px',
            },
          });
    }

    handleChange(event) {
        console.log('changed');
    }

    render() {
        const classes = this.useStyles();
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
                                {/* <MyInputLabel htmlFor="algorithm-native-simple">Algorithm</MyInputLabel> */}
                                <MySelect
                                native
                                onChange={(event) => this.props.onSelectAlgorithm(event)}
                                inputProps={{
                                    name: 'Algorithm',
                                    id: 'algorithm-native-simple',
                                }}
                                >
                                <option value={"Dijkstra"}>Dijkstra</option>
                                <option value={"A* Search"}>A*Search</option>
                                </MySelect>
                            </FormControl>
                        </div>

                    {/* Bullet Select */}
                        <div className='radio-buttons'>
                            <FormControl component="fieldset">
                                <RadioGroup row aria-label="position" name="position" defaultValue="Place Walls" onChange={(event) => this.props.onSelectAction(event)}>
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
                            <Button variant="contained" color='secondary' onClick={() => this.props.onVisualize()}>
                                Visualize
                            </Button>
                            <div className='spacing'></div>
                            <Button variant="contained" color='secondary' onClick={() => this.props.onClear()}>
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

