import React, {useState, useEffect} from 'react';
import { getAnimals } from '../service/apicalls';
import React, {Fragment} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import {Grid} from "@material-ui/core";
import AnimalModal from "../modal/AnimalModal";

const useStyles = makeStyles((theme) => ({
    container: {
        padding: '25px',
    },
}));

const AdminView=()=> {
    const classes = useStyles();
    const [animalsList, setAnimalList] = useState([]);

    useEffect(() => {
        getAnimals((res) => {
            setAnimalList(res)
        }, (err) => {
            console.error(err)
        });
    }, [setAnimalList])

    return (
        <Fragment>
            <AppBar position="static" style={{backgroundColor:'#99B687'}}>
                <Toolbar>
                    <Typography variant="h5" style={{color: 'black'}}>
                        Tierheim Administration
                    </Typography>
                </Toolbar>
            </AppBar>
        <Grid container className={classes.container}>
            <Grid item xs={12}>
                <AnimalModal/>
            </Grid>
        </Grid>
        </Fragment>
    );
}

export default AdminView;