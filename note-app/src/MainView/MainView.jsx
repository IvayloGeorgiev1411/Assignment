import { useEffect, useState } from "react";
import './MainView.css';
import { createNote, getAllNotes } from "../services/services";
import { Note } from "../Note/Note";

export const MainView = () => {

    const [note, setNote] = useState({
        title: '',
        content: '',
    })

    const [allNotes, setAllNotes] = useState([]);
    console.log(allNotes);

    const handleGetNotes = async () => {
        const notes = await getAllNotes();
        setAllNotes(notes);
    }


    const handleCreate = async () => {
        if (!note.title || !note.content) {
            alert('Both fields must be filled in order to create a note');
        }
        try {
            const response = await createNote(note);
            setNote({title: '', content: ''});
            await handleGetNotes();
        } catch (error) {
            console.log(error.message);
        }
    }

    
    useEffect(() => {
        handleGetNotes();
    }, [])

    useEffect(() => {
        if (allNotes.length > 0) {
            console.log("AllNotes updated:", allNotes);
        }
    }, [allNotes]);

    return (
        <div id="main-view">
            <h1>Note Taker</h1>

            <div id="input-area">
                <label htmlFor="title"></label>
                <input
                    type="text"
                    name="title"
                    id="title"
                    value={note.title}
                    onChange={(e) => setNote({ ...note, title: e.target.value })} />

                <label htmlFor="content"></label>
                <textarea
                    id="content"
                    name="content"
                    value={note.content}
                    onChange={(e) => setNote({ ...note, content: e.target.value })}
                />
                <button id="create-btn" onClick={handleCreate}>Create</button>
            </div>

            <div id="notes-area">
                {allNotes.length > 0 && allNotes.map(note => {
                    return <Note 
                    key={note.id} 
                    id={note.id} 
                    title={note.title} 
                    content={note.content}
                    handleGetNotes={handleGetNotes} />
                })}
            </div>

        </div>
    )
}