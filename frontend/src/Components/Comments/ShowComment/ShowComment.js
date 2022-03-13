import React from 'react';
import Avatar from '../../assets/icons/avatar.svg'
import './ShowComment.css';

function ShowComment() {
  return (
    <>
        <div className="comment">
            <div className="info-img">
                <img src={Avatar} alt="Avatar profil par default" />
            </div>
            <div className="comment-content">
                <span>Amadou Dioubaté</span>
                <p>comentaire</p>
            </div>
        </div>
    </>
  );
}

export default ShowComment;