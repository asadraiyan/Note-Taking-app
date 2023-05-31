import React from 'react'
import { CardContent } from '@mui/material';
import { Button, TextField } from '@material-ui/core';

const NoteCreate = (props) => {
    const {
        inputTitle,
        handleAddNote,
        handleTitleChange,
        inputErrorMessage,
        inputDescription,
        handleDescriptionChange,
        descErrorMessage
    } = props
    return (
        <CardContent style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center"
        }}>
            <h1 >Create Note</h1>
            <div >
                <TextField
                    label="Title"
                    value={inputTitle}
                    onChange={handleTitleChange}
                    error={inputErrorMessage !== ''}
                    helperText={inputErrorMessage}
                    style={{
                        marginBottom: '10px',
                        padding: '10px',
                        width: "500px"
                    }}
                />
            </div>
            <div>
                <TextField
                    label="Description"
                    value={inputDescription}
                    onChange={handleDescriptionChange}
                    style={{
                        marginBottom: '10px',
                        padding: '10px',
                        marginTop: "10px",
                        width: "500px"
                    }}
                    required={inputTitle?.length < 10}
                    helperText={descErrorMessage}
                    error={descErrorMessage !== ''}
                />
            </div>
            <Button variant="contained" color="primary" onClick={handleAddNote} style={{ marginTop: "10px", marginLeft: '10px' }} >
                Add Note
            </Button>
        </CardContent>
    )
}

export default NoteCreate
