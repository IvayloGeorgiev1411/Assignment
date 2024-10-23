/* eslint-disable no-unused-vars */
import { editNote } from '../services/services';
import './EditModal.css'
import { useState } from 'react'
import PropTypes from 'prop-types';

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

                <div id='edit-section'>
                    <div className='new-input'>
                        <label>Title</label>
                        <input
                            type="text"
                            id="newTitle"
                            value={newNote.title}
                            onChange={(e) => setNewNote({ ...newNote, title: e.target.value })} />
                    </div>
                    <div className='new-input'>
                        <label>Content</label>
                        <textarea
                            id='newContent'
                            value={newNote.content}
                            onChange={(e) => setNewNote({ ...newNote, content: e.target.value })}></textarea>
                    </div>
                    <button className='edit-btn' onClick={handleEditModal}>Save</button>
                </div>
            </div>
        </div>
    )
}

EditModal.propTypes = {
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    toggleModal: PropTypes.func.isRequired,
    getNotes: PropTypes.func.isRequired,
};