import React, {useState} from 'react'
import { Autocomplete } from '@react-google-maps/api';
import { AppBar, Toolbar,Typography,InputBase, Box } from '@material-ui/core';
import {searchIcon} from '@material-ui/icons';
import useStyles from './styles';

const Header = ({setCoordinates}) => {
    // Import styles from classes
    const classes = useStyles();
    const [autocomplete, setAutoComplete] = useState(null);

    // Onload function
    const onLoad = (autoC) => {
        setAutoComplete(autoC);
    }

    const onPlaceChanged = () => {
        // Google map documentation
        const lat = autocomplete.getPlace().geometry.location.lat();
        const lng  = autocomplete.getPlace().geometry.location.lng();

        setCoordinates({lat, lng});
    
    }

    return (
        <AppBar position="static">
            <Toolbar className={classes.toolbar}>
                <Typography variant="h5" className={classes.title}>
                    Travel Advisor
                </Typography>
                <Box display="flex">
                    <Typography variant="h6" className={classes.title}>
                        Explore New Place
                    </Typography>
                    <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
                        <div className={classes.search}>
                            <div className={classes.searchIcon}>
                               
                            </div>
                            <InputBase placeholder='Search...' classes={{root: classes.inputRoot, input: classes.inputInput}}/>
                        </div>
                    </Autocomplete>
                </Box>
            </Toolbar>
        </AppBar>
    )
}

export default Header
