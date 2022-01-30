import React, {Fragment, useState, useEffect} from 'react';
import {getAnimals, updateAnimal} from '../service/apicalls';
import {makeStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import {
    Box, Button,
    Grid, IconButton,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer, TableHead,
    TablePagination,
    TableRow, TableSortLabel
} from "@material-ui/core";
import Alert from '@material-ui/lab/Alert';
import CloseIcon from '@material-ui/icons/Close';
import * as PropTypes from "prop-types";
import { useNavigate } from 'react-router-dom';
import {completeTask} from "../service/camunda_api_calls";

const useStyles = makeStyles(() => ({
    container: {
        padding: '25px',
    },
    button: {
        backgroundColor: '#333b2e',
        color: '#99B687',
        borderRadius: '0px',
    },
    tableHead: {
        backgroundColor: '#E7F7DE'
    },
    tableCell: {
        fontWeight: 'bold'
    },
    alert: {
        position: 'fixed',
        bottom: 25,
        right: 25
    }
}));

const headCells = [
    {
        id: 'name',
        label: 'Name',
    },
    {
        id: 'species',
        label: 'Tierart',
    },
    {
        id: 'breed',
        label: 'Rasse',
    },
    {
        id: 'arrival',
        label: 'Ankunft',
    },
    {
        id: 'comment',
        label: 'Bemerkungen',
    },
    {
        id: '',
        label: '',
    },
];

function CustomTableHead(props) {
    const classes = useStyles();

    const {order, orderBy, onRequestSort} =
        props;
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead className={classes.tableHead}>
            <TableRow>
                {headCells.map((headCell) => (
                    <TableCell
                        className={classes.tableCell}
                        key={headCell.id}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}
                        >
                            {headCell.label}
                            {orderBy === headCell.id ? (
                                <Box component="span" style={{contentVisibility: 'hidden'}}>
                                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                </Box>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

CustomTableHead.propTypes = {
    numSelected: PropTypes.number,
    order: PropTypes.string,
    orderBy: PropTypes.string,
    onRequestSort: PropTypes.func,
};

const AdminView = () => {
    const classes = useStyles();
    const [animalsList, setAnimalList] = useState([]);
    const [open, setOpen] = React.useState(false);
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('calories');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [timer, setTimer] = useState(10)
    const navigate = useNavigate();

    // Animal Table
    const formatDate = (dateString) => {
        const options = {year: "numeric", month: "numeric", day: "numeric"}
        return new Date(dateString).toLocaleDateString(undefined, options)
    }

    function descendingComparator(a, b, orderBy) {
        if (b[orderBy] < a[orderBy]) {
            return -1;
        }
        if (b[orderBy] > a[orderBy]) {
            return 1;
        }
        return 0;
    }

    function getComparator(order, orderBy) {
        return order === 'desc'
            ? (a, b) => descendingComparator(a, b, orderBy)
            : (a, b) => -descendingComparator(a, b, orderBy);
    }

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - animalsList.length) : 0;

    // Alert
    const handleOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }

    // Alert and set to adopted
    const handleAdopt = (animal) => {
        updateAnimal(animal.id, {...animal, status: "ADOPTED"}, (res) => {
            console.log(res)
        }, (err) => {
            console.error(err)
        });
        completeTask("adopt_animal");
        setTimeout(function() {
            navigate('/')
        }, 10000);
    }

    // UseEffects
    useEffect(() => {
        getAnimals((res) => {
            setAnimalList(res.data.filter((animal) => {
                return animal.status === 'TO_BE_ADOPTED'
            }));
        }, (err) => {
            console.error(err)
        });
    }, [setAnimalList, open])

    useEffect(() => {
        open && setTimeout(() => setTimer(timer - 1), 1000);
    }, [timer, open]);

    return (
        <Fragment>
            <AppBar position="static" style={{backgroundColor: '#99B687'}}>
                <Toolbar>
                    <Typography variant="h5" style={{color: 'black'}}>
                        Tierheim Administration
                    </Typography>
                </Toolbar>
            </AppBar>
            <Grid container className={classes.container}>
                <Grid item xs={12}>
                    {open ?
                        <Alert className={classes.alert}
                            action={
                                <IconButton
                                    aria-label="close"
                                    color="inherit"
                                    size="small"
                                    onClick={handleClose}
                                >
                                    <CloseIcon fontSize="inherit" />
                                </IconButton>
                            }
                        >
                            Glückwunsch, du hast das Tier erfolgreich adoptiert. Du wirst in {timer} Sekunde/n weitergeleitet.
                        </Alert>
                    : null}
                    <Paper sx={{width: '100%', mb: 2}}>
                        <TableContainer>
                            <Table
                                sx={{minWidth: 750}}
                                aria-labelledby="tableTitle"
                                size={'medium'}
                            >
                                <CustomTableHead
                                    order={order}
                                    orderBy={orderBy}
                                    onRequestSort={handleRequestSort}
                                    rowCount={animalsList.length}
                                />
                                <TableBody>
                                    {animalsList.slice().sort(getComparator(order, orderBy))
                                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                        .map((row, index) => {
                                            return (
                                                <TableRow
                                                    hover
                                                    tabIndex={-1}
                                                    key={row.name}
                                                >
                                                    <TableCell
                                                        component="th"
                                                        scope="row"
                                                    >
                                                        {row.name}
                                                    </TableCell>
                                                    <TableCell align="left">{row.species}</TableCell>
                                                    <TableCell align="left">{row.breed}</TableCell>
                                                    <TableCell align="left">{formatDate(row.arrival)}</TableCell>
                                                    <TableCell align="left">{row.comment}</TableCell>
                                                    <TableCell align="right">
                                                        <Button variant={"contained"} className={classes.button} onClick={() => {
                                                            handleAdopt(row)
                                                            handleOpen()
                                                        }}>
                                                            ADOPTIEREN
                                                        </Button>
                                                    </TableCell>
                                                </TableRow>
                                            );
                                        })}
                                    {emptyRows > 0 && (
                                        <TableRow
                                            style={{
                                                height: (53) * emptyRows,
                                            }}
                                        >
                                            <TableCell colSpan={6}/>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <TablePagination
                            rowsPerPageOptions={[5, 10, 25]}
                            component="div"
                            count={animalsList.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                        />
                    </Paper>
                </Grid>
            </Grid>
        </Fragment>
    );
}

export default AdminView;