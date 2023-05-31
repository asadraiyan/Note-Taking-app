import './App.css';
import NoteEdit from './Components/NoteEdit';
import NoteList from './Components/NoteList';
import NoteCreate from './Components/NoteCreate';
import React, { useState, useEffect } from 'react';
import { Route, Routes } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

function App() {

  const [notes, setNotes] = useState(() => JSON.parse(localStorage.getItem("noteList")) || []);
  const [inputTitle, setInputTitle] = useState('');
  const [inputDescription, setInputDescription] = useState('');
  const [inputErrorMessage, setInputErrorMessage] = useState('');
  const [descErrorMessage, setDescErrorMessage] = useState('');

  const navigate = useNavigate()

  const handleAddNote = () => {
    if (inputTitle.trim() === '') {
      setInputErrorMessage('Title is required');
      return;
    }

    if (inputTitle.length < 10 && inputDescription?.trim() === '') {
      setDescErrorMessage('Description is required');
      return;
    }

    if (notes.some((note) => note.title === inputTitle)) {
      setInputErrorMessage('A note with the same title already exists');
      return;
    }

    const newNote = {
      title: inputTitle,
      description: inputDescription,
    };

    setNotes([...notes, newNote]);
    setInputTitle('');
    setInputDescription('');
    setInputErrorMessage('');
    navigate("/")
  };

  const handleTitleChange = (event) => {
    setInputTitle(event.target.value);
    if (event.target.value.length >= 10) {
      setDescErrorMessage('')
    }
  };

  const handleDescriptionChange = (event) => {
    setInputDescription(event.target.value);
  };

  const handleEditNote = () => {
    const updatedNotes = notes?.map(note => {
      if (note.title === inputTitle) {
        return {
          ...note,
          description: inputDescription
        }
      } else {
        return note
      }
    })
    setNotes(updatedNotes);
    setInputTitle('');
    setInputDescription('');
    setInputErrorMessage('');
    navigate("/")
  };

  const handleDeleteNote = (index, e) => {
    e.stopPropagation()
    setNotes(notes.filter((_, i) => i !== index));
  };

  useEffect(() => {
    localStorage.setItem("noteList", JSON.stringify(notes))
  }, [notes])


  return (
    <>
      <Routes>
        <Route exact path="/" element={
          <NoteList
            notes={notes}
            onDelete={handleDeleteNote}
          />
        } />

        <Route exact path="/add" element={
          <NoteCreate
            handleAddNote={handleAddNote}
            inputTitle={inputTitle}
            handleTitleChange={handleTitleChange}
            inputErrorMessage={inputErrorMessage}
            inputDescription={inputDescription}
            handleDescriptionChange={handleDescriptionChange}
            descErrorMessage={descErrorMessage}
          />
        } />

        <Route exact path="/edit/:title" element={
          <NoteEdit
            notes={notes}
            onEdit={handleEditNote}
            onDelete={handleDeleteNote}
            handleAddNote={handleAddNote}
            inputTitle={inputTitle}
            handleTitleChange={handleTitleChange}
            inputErrorMessage={inputErrorMessage}
            inputDescription={inputDescription}
            handleDescriptionChange={handleDescriptionChange}
            descErrorMessage={descErrorMessage}
            setInputTitle={setInputTitle}
            setInputDescription={setInputDescription}
          />
        } />
      </Routes>
    </>
  );
}

export default App;
