import React, {useEffect} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import {makeStyles} from "@material-ui/core/styles";
import {Grid, MenuItem, withStyles} from "@material-ui/core";
import {addAnimal, updateAnimal} from "../service/apicalls";
import {completeTask, startAdminTask} from "../service/camunda_api_calls";

const useStyles = makeStyles(() => ({
    button: {
        backgroundColor: '#333b2e',
        color: '#99B687',
        borderRadius: '0px',
        marginBottom: '25px'
    },
    buttonOutlined: {
        color: '#99B687',
        borderRadius: '0px',
        marginBottom: '25px'
    },
    textField: {
        color: '#99B687',
    }
}));

const CssTextField = withStyles({
    root: {
        '& label.Mui-focused': {
            color: 'black',
        },
        '& .MuiInput-underline:after': {
            borderBottomColor: 'black',
        },
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                borderColor: 'black',
            },
            '&:hover fieldset': {
                borderColor: 'black',
            },
            '&.Mui-focused fieldset': {
                borderColor: 'black',
            },
        },
    },
})(TextField);

const statuses = [
    {
        value: 'TO_BE_EXAMINED',
        label: 'Wartet auf Untersuchung',
    },
    {
        value: 'CONTACT_OWNER',
        label: 'Besitzer kontaktieren',
    },
    {
        value: 'TO_BE_ADOPTED',
        label: 'Zur Adoption',
    },
    {
        value: 'TO_BE_EUTHANISED',
        label: 'Wird eingeschläfert',
    },
    {
        value: 'PICKED_UP',
        label: 'Abgeholt',
    },
    {
        value: 'EUTHANISED',
        label: 'Eingeschläfert',
    },
    {
        value: 'TO_BE_PICKED_UP',
        label: 'Wird abgeholt',
    },
];

export default function AnimalModal(props) {
    const [name, setName] = React.useState("");
    const [species, setSpecies] = React.useState("");
    const [breed, setBreed] = React.useState("");
    const [status, setStatus] = React.useState("TO_BE_EXAMINED");
    const [comment, setComment] = React.useState("");
    const classes = useStyles();

    const saveData = (data) => {
        if(status === "TO_BE_EXAMINED"){
            startAdminTask();
        }
        if (props.edit) {
            updateAnimal(props.data.id, data, (res) => {
                console.log(res)
            }, (err) => {
                console.error(err)
            });
        } else {
            addAnimal(data, (res) => {
                console.log(res)
            }, (err) => {
                console.error(err)
            });
        }
    }

    const handleClose = () => {
        props.handleClose();
        setName("");
        setSpecies("");
        setBreed("");
        setStatus("TO_BE_EXAMINED");
        setComment("");
    };

    const handleSave = () => {
        saveData({ name, species, breed, comment, status })

        switch (status) {
            case "TO_BE_EXAMINED":
                completeTask("register_animal");
                break;
            case "CONTACT_OWNER":
            case "TO_BE_EUTHANISED":
            case "TO_BE_ADOPTED":
                completeTask("animal_examined", {
                    "variables": {
                        "animal_status": {
                            "value": status,
                            "type": "string"
                        }
                    }
                });
                break;
            case "PICKED_UP":
                completeTask("animal_picked_up");
                break;
            case "EUTHANISED":
                completeTask("animal_euthanised");
                break;
        }

        handleClose();
    }

    useEffect(() => {
        if(props.data) {
            setName(props.data.name);
            setSpecies(props.data.species);
            setBreed(props.data.breed);
            setStatus(props.data.status);
            setComment(props.data.comment);
        }
    }, [props.data])

    return (
        <div>
            <Dialog open={props.isOpen} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Tier erfassen</DialogTitle>
                <DialogContent style={{width: "500px", height: "400px"}}>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                        <CssTextField
                            autoFocus
                            required
                            value={props.name ? props.name : name}
                            margin="dense"
                            id="name"
                            label="Name"
                            type="text"
                            variant={"outlined"}
                            fullWidth
                            className={classes.textfield}
                            onChange={(event) => {
                                setName(event.target.value)
                            }}
                        />
                        </Grid>
                        <Grid item xs={6}>
                        <CssTextField
                            required
                            margin="dense"
                            value={props.species ? props.species :species}
                            id="species"
                            label="Tierart"
                            type="text"
                            variant={"outlined"}
                            fullWidth
                            className={classes.textfield}
                            onChange={(event) => {
                                setSpecies(event.target.value)
                            }}
                        />
                        </Grid>
                        <Grid item xs={6}>
                            <CssTextField
                                margin="dense"
                                value={props.breed ? props.breed :breed}
                                id="breed"
                                label="Rasse"
                                type="text"
                                variant={"outlined"}
                                fullWidth
                                className={classes.textfield}
                                onChange={(event) => {
                                    setBreed(event.target.value)
                                }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <CssTextField
                                id="status"
                                select
                                required
                                disabled={!props.edit}
                                margin="dense"
                                fullWidth
                                label="Status"
                                value={props.status ? props.status :status}
                                onChange={(event) => {
                                    setStatus(event.target.value)
                                }}
                                variant="outlined"
                            >
                                {statuses.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </CssTextField>
                        </Grid>
                        <Grid item xs={12}>
                            <CssTextField
                                id="comment"
                                label="Bemerkung"
                                multiline
                                margin="dense"
                                fullWidth
                                rows={5}
                                value={props.comment ? props.comment : comment}
                                inputProps={{ maxLength: 250 }}
                                variant="outlined"
                                onChange={(event) => {
                                    setComment(event.target.value)
                                }}
                            />
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} className={classes.buttonOutlined} variant={"outlined"}>
                        ABBRECHEN
                    </Button>
                    <Button disabled={name === "" || species === "" || status === ""} onClick={handleSave} variant={"contained"}
                            className={classes.button} style={{marginRight: "17px"}}>
                        SPEICHERN
                    </Button>
            </DialogActions>
        </Dialog>
</div>
)
    ;
}
