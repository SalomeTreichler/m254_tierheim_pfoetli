import React from 'react';
import {Button, Grid, Link, makeStyles} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
    link: {
        color: 'white',
    },
    button: {
        backgroundColor: '#99B687',
        width: '150px'
    },
}));

const Home=()=> {
    const classes = useStyles();
    return (
        <Grid container
              direction="row"
              justifyContent="center"
              alignItems="center"
              justify="center"
              spacing={4}
              style={{
                  position: 'absolute',
                  left: '50%',
                  top: '50%',
                  transform: 'translate(-50%, -50%)'
              }}
        >
            <Grid item container xs={12} justifyContent={'center'}>
                <h1 style={{fontSize: '100px', color: '#333b2e'}}>Willkommen im Tierheim Pfötli</h1>
            </Grid>
            <Grid item xs={6} container justifyContent="flex-end">
            <Button variant="contained" className={classes.button}>
                <Link href={"/admin"} underline={'none'} className={classes.link}>Ich bin ein Admin</Link>
            </Button>
            </Grid>
            <Grid item xs={6}>
            <Button variant="contained" className={classes.button}>
                <Link href={"/visitor"} underline={'none'} className={classes.link}>Ich bin ein Besucher</Link>
            </Button>
            </Grid>
        </Grid>
    );
}

export default Home;