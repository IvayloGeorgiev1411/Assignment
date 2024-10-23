/* eslint-disable no-unused-vars */
import { useState } from 'react'
import { removeNote } from '../services/services'
import './Note.css'
import { EditModal } from '../EditModal/EditModal';
import PropTypes from 'prop-types';


export const Note = ({ id, title, content, handleGetNotes }) => {

    const [modalOpen, setModalOpen] = useState(false);
    const toggleModal = () => setModalOpen(!modalOpen);
    console.log(modalOpen);


    const handleRemove = async () => {
        try {
            const remove = await removeNote(id);
            handleGetNotes();
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <div className="note-div">
                <div className='top-section'>
                    <h4 onClick={toggleModal}>{title}</h4>
                    <span className="close" onClick={handleRemove}>&times;</span>
                </div>

                <p>{content}</p>
            </div>
            {modalOpen &&
                <EditModal
                    key={id}
                    id={id}
                    title={title}
                    content={content}
                    open={modalOpen}
                    toggleModal={toggleModal}
                    getNotes={handleGetNotes} />
            }
        </>
    )
}

Note.propTypes = {
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    handleGetNotes: PropTypes.func.isRequired,
};