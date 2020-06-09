import React from 'react';
import { Link } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

export default function SimpleTable(props) {
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Identifiant</TableCell>
            <TableCell align="right">Nom</TableCell>
            <TableCell align="right">Description</TableCell>
            <TableCell align="right">Date de création</TableCell>
            <TableCell align="right">Comics</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.chars.map(row => (
            <TableRow key={row.id}>
              <TableCell component="th" scope="row">
                <Link to={`/character/${row.id}`}>{row.id}</Link>
              </TableCell>
              <TableCell align="right">{row.name}</TableCell>
              <TableCell align="right">{row.description}</TableCell>
              <TableCell align="right">{row.modified}</TableCell>
              <TableCell align="right">{row.comics.available}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
