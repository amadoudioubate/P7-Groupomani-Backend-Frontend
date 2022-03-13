import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Modal from 'react-modal';
import Avatar from '../../assets/images/avatar.jpg';
import NewPostForm from '../Post/NewPostForm/NewPostForm';
import './QuoiDeNeuf.css';

function QuoiDeNeuf() {
    const [isFocus, setIsFocus] = useState(false);
    const [modalIsOpen, setIsOpen] = useState(false);
    const userData = useSelector(state => state.userReducer);
    
    function openModal() {
        setIsOpen(true);
    }
    
    function closeModal() {
        setIsOpen(false);
    }

    const customStyles = {
        content: {
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
          transform: 'translate(-50%, -50%)',
        },
    };

    Modal.setAppElement('#root');

    const handleFocus = () => {
        setIsFocus(!isFocus);
    }

  return (
    <div className='quoideneuf-container'>
        <img src={userData.imageUrl ? userData.imageUrl : Avatar} alt="Avatar profil" />
        <textarea 
          name="text" 
          id="text" 
          cols="3" 
          rows="3" 
          placeholder="Quoi de neuf ?"
          onFocus={handleFocus}
          onBlur={handleFocus}
          onClick={openModal}
        /> 
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
            <button onClick={closeModal}>close</button>
            <NewPostForm />
        </Modal> 
    </div>
  )
}

export default QuoiDeNeuf