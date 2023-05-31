import React, { useEffect } from 'react'
import { CardContent } from '@mui/material';
import { useParams } from 'react-router-dom'
import { Button, TextField } from '@material-ui/core';

const NoteEdit = (props) => {
    const {
        notes,
        inputTitle,
        onEdit,
        handleTitleChange,
        inputErrorMessage,
        inputDescription,
        handleDescriptionChange,
        descErrorMessage,
        setInputTitle,
        setInputDescription
    } = props
    const { title } = useParams()
    console.log("title =", title)
    useEffect(() => {
        setInputTitle(title)
        const description = notes.find(note => note?.title === title)?.description
        setInputDescription(description)
    }, [title])

    return (
        <CardContent style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center"
        }}>
            <h1>Edit Note</h1>
            <div>
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
                    disabled
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
            <Button variant="contained" color="primary" onClick={onEdit} style={{ marginTop: "10px", marginLeft: '10px' }} >
                Save Note
            </Button>
        </CardContent>
    )
}

export default NoteEdit
