import React from 'react'
import { Button } from '@material-ui/core';
import { useNavigate } from 'react-router-dom';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

const NoteList = (props) => {
    const {
        notes,
        onDelete
    } = props

    const navigate = useNavigate()

    return (
        <div style={{
            marginTop: "20px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center"
        }}>
            <div style={{
                display: "flex",
                flexDirection: "note",
                justifyContent: "space-between",
                width: "700px",
                height: "50px",
                alignItems: "center"

            }}>
                <h1 >Note Taking App</h1>
                <Button variant="contained" color="primary" onClick={() => navigate('/add')}>
                    Add Note
                </Button>
            </div>
            <TableContainer style={{ marginTop: "15px", width: "700px" }}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Title</TableCell>
                            <TableCell align="right">Description</TableCell>
                            <TableCell align="center">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {notes?.map((note, index) => (
                            <TableRow
                                hover
                                key={note.title}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                onClick={() => navigate(`/edit/${note.title}`)}
                            >
                                <TableCell component="th" scope="note">
                                    {note.title}
                                </TableCell>
                                <TableCell align="right">{note.description}</TableCell>
                                <TableCell align="center">
                                    <div>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            onClick={() => navigate(`/edit/${note.title}`)}
                                            style={{ marginTop: "10px" }}
                                        >
                                            Edit
                                        </Button>
                                        <Button
                                            variant="contained"
                                            color="secondary"
                                            onClick={(e) => onDelete(index, e)}
                                            style={{ marginLeft: "10px", marginTop: "10px" }}
                                        >
                                            Delete
                                        </Button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}

export default NoteList
