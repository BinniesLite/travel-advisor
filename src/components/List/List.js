import React,{useState, useEffect, createRef} from 'react'
import useStyles from './style'
import {CircularProgress, Grid, Typography, InputLabel, MenuItem, FormControl, Select} from '@material-ui/core';
import PlaceDetail from '../PlaceDetail/PlaceDetail';
import { ChildCareOutlined } from '@material-ui/icons';
const List = ({places, childClicked, loading, type, rating, setType, setRating}) => {
    
    // Import styles    
    const classes = useStyles();


    const [elRefs, setElRefs] = useState([]);
    
    useEffect(() => {
        const refs = Array(places?.length).fill().map((_, i) => {
            elRefs[i] || createRef();
        })
        setElRefs(refs);
    }, [places]);
    
    console.log(type);

    // When changing the type
    const changeTypeHandler = e => {
        setType(e.target.value);
    }
    // When changing the type
    const changeRatingHandler = e => {
        setType(e.target.value);
    }

    return (
        <div className={classes.container}>
            <Typography variant="h4">
                Restaurants, Hotels & Attraction around you
            </Typography>
            {loading ? (
                <div className={classes.loading}>
                    <CircularProgress size="5rem"></CircularProgress>
                </div>
            ) : (
                <>
                <FormControl className={classes.formControl}>
                    <InputLabel id="type">Type</InputLabel>
                    <Select id="type" value={type} onChange={e => setType(e.target.value)}>
                        <MenuItem value="restaurants">Restaurants</MenuItem>
                        <MenuItem value="hotels">Hotels</MenuItem>
                        <MenuItem value="attractions">Attraction</MenuItem>
                    </Select>
                                </FormControl>
                <FormControl className={classes.formControl}>
                    <InputLabel>Rating</InputLabel>
                    <Select value={rating} onChange={e => setRating(e.target.value)}>
                        <MenuItem value={0}>All</MenuItem>
                        <MenuItem value={3}>Above 3.0</MenuItem>
                        <MenuItem value={4}>Above 4.0</MenuItem>
                        <MenuItem value={4.5}>Above 4.5</MenuItem>
                    </Select>
                                </FormControl>
                                {places?.map((place, i) =>
                    <Grid item refs={elRefs} key={i} xs={12} className={classes.list}>
                            <PlaceDetail
                                place={place}
                                selected= {Number(childClicked === i)}
                                refProp={elRefs[i]}
                            ></PlaceDetail>
                    </Grid> )}
                </>
            )}
        </div>
    
    )
}

export default List
