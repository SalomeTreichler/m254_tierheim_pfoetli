import React, {Fragment} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import {Button, Grid} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    button: {
        backgroundColor:'#333b2e',
        color: '#99B687',
        borderRadius: '0px',
        marginBottom: '25px'
    },
    container: {
        padding: '25px',
    },
}));

const AdminView=()=> {
    const classes = useStyles();
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
                <Button variant={"contained"} className={classes.button}>
                    Tier Erfassen
                </Button>
            </Grid>
        </Grid>
        </Fragment>
    );
}

export default AdminView;