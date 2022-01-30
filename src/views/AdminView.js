import React, {Fragment, useState, useEffect} from 'react';
import {getAnimals} from '../service/apicalls';
import {makeStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import {
    Box,
    Grid,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer, TableHead,
    TablePagination,
    TableRow, TableSortLabel
} from "@material-ui/core";
import AnimalModal from "../modal/AnimalModal";
import status from "../utils/status";
import CallIcon from '@material-ui/icons/Call';
import * as PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import {startAdminTask} from "../service/camunda_api_calls";

const useStyles = makeStyles((theme) => ({
    container: {
        padding: '25px',
    },
    button: {
        backgroundColor: '#333b2e',
        color: '#99B687',
        borderRadius: '0px',
        marginBottom: '25px'
    },
    tableHead: {
        backgroundColor: '#E7F7DE'
    },
    tableCell: {
        fontWeight: 'bold'
    },
    hover: {
        cursor: 'pointer'
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
        id: 'status',
        label: 'Status',
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
    const [open, setOpen] = useState(false)
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('calories');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [edit, setEdit] = useState(false)
    const [selectedAnimal, setSelectedAnimal] = useState(null);

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

    const handleClick = (animal) => {
        // Do handle Click stuff
        setSelectedAnimal(animal)
        setEdit(true)
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

    // Animal Modal
    const handleOpen = () => {
        startAdminTask();
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
        setEdit(false);
    }

    const handleCallOwner = (event) => {
        event.stopPropagation()
        // handle call owner
    }

    // UseEffects
    useEffect(() => {
        getAnimals((res) => {
            setAnimalList(res.data)
        }, (err) => {
            console.error(err)
        });
    }, [setAnimalList, open])

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
                    <AnimalModal isOpen={open} handleClose={handleClose} data={selectedAnimal} edit={edit}/>
                    <Button variant={"contained"} className={classes.button} onClick={handleOpen}>
                        TIER ERFASSEN
                    </Button>
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
                                                    className={classes.hover}
                                                    hover
                                                    onClick={() => {
                                                        handleClick(row)
                                                        handleOpen()
                                                    }}
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
                                                    <TableCell align="left">{status(row.status)}</TableCell>
                                                    {row.status === "CONTACT_OWNER" ?
                                                        <TableCell align="right">
                                                            <CallIcon className={classes.hover} onClick={(event) => handleCallOwner(event)}/>
                                                        </TableCell>
                                                        : <TableCell align="right"/>
                                                    }
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