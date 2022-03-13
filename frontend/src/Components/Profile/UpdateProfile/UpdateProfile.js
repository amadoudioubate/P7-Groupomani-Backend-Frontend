import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from '../../../actions/users/userActions';
import './UpdateProfile.css';

function UpdateProfile() {
    const [firstNameUpdate, setFirstNameUpdate] = useState();
    const [lastNameUpdate, setLastNameUpdate] = useState();
    const [jobUpdate, setJobUpdate] = useState();
    const [imageUpdate, setImageUpdate] = useState();
    const [file, setFile] = useState();
    const userData = useSelector(state => state.userReducer);
    const dispatch = useDispatch();

    const saveFileImg = (e) => {
        setFile(e.target.files[0]);
        setImageUpdate(e.target.files[0].name);
    }

    const updateProfile = async (e) => {
        e.preventDefault();
        // const data = {
        //     firstName: firstNameUpdate,
        //     lastName: lastNameUpdate,
        //     job: jobUpdate,
        //     imageUrl: imageUpdate
        // };
        const data = new FormData();
        data.append('UserId', userData.id);
        data.append('title', title);
        data.append('content', content);
        //if (file) data.append("file", file);
        data.append('imageUrl', postImageUrl);

        dispatch(updateUser(userData.id, data));
    }

  return (
    <>
        <h3 className='title-update'>Modifier vos informations</h3><br />
        <form className="signup-form">
            <div className="form-group">
                <label htmlFor="firstName">Prénom</label> 
                <input type="text" 
                    id="fistName"
                    name="firstName"
                    defaultValue={userData.firstName}
                    onChange={(e) => setFirstNameUpdate(e.target.value)}
                />            
            </div>

            <div className="form-group">
                <label htmlFor="lastName">Nom</label>
                <input type="text" 
                    id="lastName"
                    name="larstName"
                    defaultValue={userData.lastName}
                    onChange={(e) => setLastNameUpdate(e.target.value)}
                />
            </div>

            <div className="form-group">
                <label htmlFor="job">Job</label>
                <input type="text" 
                    id="job"
                    name="job"
                    defaultValue={userData.job}
                    onChange={(e) => setJobUpdate(e.target.value)}
                />
            </div>

            <div className="form-group">
                <label htmlFor="file">Photo profil</label>
                <input type="file"  
                id="fileimg" 
                name="file"
                onChange={saveFileImg}
                accept=".jpg, .jpeg, .png"  
                />
            </div>
                        
            <div className="form-group">
                <label htmlFor="email">Email</label>
                <input type="email" id="email" 
                    defaultValue={userData.email}
                    disabled
                />
            </div>
            <button className='btn-update' onClick={updateProfile}>
                Valider la modification
            </button>
        </form>
    </>
  );
}

export default UpdateProfile