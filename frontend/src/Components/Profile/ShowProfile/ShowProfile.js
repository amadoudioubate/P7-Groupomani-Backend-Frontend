import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Modal from 'react-modal';
import Avatar from '../../../assets/images/avatar.jpg';
import {  faUser, faEdit } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { updateUser } from '../../../actions/users/userActions';
import { dateParser } from '../../Utils';
import UpdateProfile from '../UpdateProfile/UpdateProfile';
import './ShowProfile.css';

function ShowProfile() {
  const [isUpdated, setIsUpdated] = useState(false);
  const [textUpdate, setTextUpdate] = useState(null);
  const [modalIsOpen, setIsOpen] = useState(false);

  const userData = useSelector((state) => state.userReducer);

  const dispatch = useDispatch();

  function openModal() {
    setIsOpen(true);
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

function closeModal() {
  setIsOpen(false);
}
  const handleProfile = () => {
    if (textUpdate) {
      dispatch(updateUser(userData.id, textUpdate));
    }
    setIsUpdated(false);
  }

  return (
  
        <div className='profile'>
            <div className='profile-img'>
                <img src={userData.imageUrl ? userData.imageUrl : Avatar} alt="pic-profil" />
            </div>
            <div className='profile-name'>
                <FontAwesomeIcon icon={faUser} />
                <span >{userData.firstName} {userData.lastName}</span>
            </div>
            <span className='profile-job'>Job : {userData.job ? userData.job : null}</span>
            <button className='profile-btn' onClick={openModal}>
                <FontAwesomeIcon icon={faEdit} className="icon-edit" />
                Modifier le profile
            </button>
            <h6 className='profile-datemember'>Membre depuis le : {dateParser(userData.createdAt)}</h6>
            <Modal isOpen={modalIsOpen}
                // onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
            >
                
                <UpdateProfile />
            </Modal>
        </div>
  )
}

export default ShowProfile;