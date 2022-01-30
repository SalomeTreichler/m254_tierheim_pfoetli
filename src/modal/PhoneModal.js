import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import {makeStyles} from "@material-ui/core/styles";
import {Grid} from "@material-ui/core";
import {updateAnimal} from "../service/apicalls";
import {completeTask} from "../service/camunda_api_calls";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
    button: {
        backgroundColor: '#333b2e',
        color: '#99B687',
        borderRadius: '0px',
        marginBottom: '25px'
    }
}));

export default function PhoneModal(props) {
    const classes = useStyles();

    const handleCloseYes = () => {
        props.handleClose();
        completeTask("call_owner", {
            "variables": {
                "owner_reachable": {
                    "value": true,
                    "type": "boolean"
                }
            }
        });
        updateAnimal(props.data.id, {...props.data, status: "TO_BE_PICKED_UP"}, (res) => {
            console.log(res)
        }, (err) => {
            console.error(err)
        });
    };

    const handleCloseNo = () => {
        props.handleClose();
        completeTask("call_owner", {
            "variables": {
                "owner_reachable": {
                    "value": false,
                    "type": "boolean"
                }
            }
        });
        updateAnimal(props.data.id, {...props.data, status: "TO_BE_ADOPTED"}, (res) => {
            console.log(res)
        }, (err) => {
            console.error(err)
        });
    };

    return (
        <div>
            <Dialog open={props.isOpen} onClose={props.handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Besitzer kontaktieren</DialogTitle>
                <DialogContent style={{width: "200px", height: "200px"}}>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <Typography>War der Besitzer erreichbar?</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Button onClick={handleCloseYes} className={classes.button} variant={"contained"}>
                                JA
                            </Button>
                        </Grid>
                        <Grid item xs={6}>
                            <Button onClick={handleCloseNo} className={classes.button} variant={"contained"}>
                                Nein
                            </Button>
                        </Grid>
                    </Grid>
                </DialogContent>
            </Dialog>
        </div>
    )
        ;
}
