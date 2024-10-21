import { editNote } from '../services/services';
import './EditModal.css'
import { useState } from 'react'

export const EditModal = ({ id, title, content, toggleModal, getNotes }) => {

    const [newNote, setNewNote] = useState({ title: title, content: content });

    const handleEditModal = async () => {
        try {
            const response = await editNote(id, newNote);
            getNotes();
            toggleModal();
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="modal">
            <div className="modal-content">
                <div id='top-section'>
                    <h2>Edit Note</h2>
                    <span className="close" onClick={toggleModal}>&times;</span>
                </div>

                <form>
                    <div>
                        <label>Title</label>
                        <input
                            type="text"
                            id='newTitle'
                            value={newNote.title}
                            onChange={(e) => setNewNote({ ...newNote, title: e.target.value })} />
                    </div>
                    <div>
                        <label>Content</label>
                        <textarea
                            id='newContent'
                            value={newNote.content}
                            onChange={(e) => setNewNote({ ...newNote, content: e.target.value })}></textarea>
                    </div>
                    <button className='edit-btn' onClick={handleEditModal}>Save</button>
                </form>
            </div>
        </div>
    )
}