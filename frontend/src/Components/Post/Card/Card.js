import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { faTrash, faEdit, faThumbsUp, faThumbsDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { deletePost, updatePost } from "../../../actions/posts/postActions";
import { dateParser } from "../../Utils";
import Avatar from '../../../assets/images/avatar.jpg';
import Modal from 'react-modal';
import UpdatePost from './UpdatePost/UpdatePost';
import './Card.css';

function Card({ post }) {
  const [IsLoading, setIsLoading] = useState(true);
  const [title, setTitle] = useState();
  const [content, setContent] = useState();
  const [file, setFile] = useState();
  const [imageUrl, setImageUrl] = useState();
  const [modalIsOpen, setIsOpen] = useState(false);
  const usersData = useSelector(state => state.usersReducer);
  const userData = useSelector(state => state.userReducer);

  const dispatch = useDispatch();

  // Modifier un post
  const updateItem = async (e) => {
    e.preventDefault();
    if (title || content || imageUrl) {
      const data = new FormData();
      data.append('UserId', userData.id);
      data.append('title', title);
      data.append('content', content);
      data.append('imageUrl', imageUrl);

      dispatch(updatePost(post.id, data));
    }
  };

  const handleImage = (e) => {
    setImageUrl(URL.createObjectURL(e.target.files[0]));
    setFile(e.target.files[0]);
  };

  // Si jamais userData n'est pas vide on passe le state isLoading à false
  useEffect(() => {
    (usersData.length > 0) && setIsLoading(false);
  }, [usersData]);

  // Suppression de post
  const deleteQuote = () => dispatch(deletePost(post.id));


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
 
  return (
    
    <div className='container-card' key={post.id}>
        <div className="card-header">
            <div className="header-info">
                <div className="info-img">
                    <img
                      src={
                        (usersData.length > 0) &&
                        usersData
                        .map((user) => {
                            if (user.id === post.UserId) return user.imageUrl;
                            else return Avatar;
                        }) 
                        .join("")
                      }
                      alt="user-pic"
                    />
                </div>
                <div className="info-user">
                    <h4 className="user-name">
                        {(usersData.length > 0) &&
                        usersData
                          .map((user) => {
                            if (user.id === post.UserId) return user.firstName +" "+ user.lastName;
                            else return null;
                          })
                          .join("")
                        }
                    </h4>
                    <span className="user-date">{dateParser(post.createdAt)}</span>
                </div>
            </div>
            <div className="header-btn">
                {userData.id === post.UserId ? (
                  <>
                   <FontAwesomeIcon icon={faEdit} className="btn-updateicon" 
                     onClick={openModal} 
                   />

                  <Modal
                      isOpen={modalIsOpen}
                      onRequestClose={closeModal}
                      style={customStyles}
                      contentLabel="Example Modal"
                    >
                      <button onClick={closeModal}>close</button>

                      <form className="post-form">
                        <div className="form-group">
                            <label htmlFor="title">Titre</label>
                            <input 
                              defaultValue={post.title}
                              onChange={(e => setTitle(e.target.value))}
                              type="text" 
                              id="title"
                              name="title"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="content">Contenu</label>
                            <textarea 
                              defaultValue={post.content}
                              onChange={(e => setContent(e.target.value))}
                              name="content" 
                              id="content" 
                              cols="30" 
                              rows="10"
                              placeholder="Votre contenu"
                            ></textarea>
                        </div>

                        <div className="form-group">
                            <label htmlFor="fileimg">Image</label>
                            <input 
                              onChange={(e) => handleImage(e)}
                              type="file" 
                              id="fileimg" 
                              name="file"
                              accept=".jpg, .jpeg, .png"
                            />
                        </div>
                        
                          <button className="btn-updatepost" type="submit" onClick={updateItem}>
                              Modifier
                          </button>
                             
                          
                        
                      </form>
                      
                  </Modal> 


                   <FontAwesomeIcon 
                    icon={faTrash} 
                    className="btn-deleteicon" 
                    onClick={() => {
                      if (window.confirm("Voulez-vous supprimer cet post ?")) {
                        deleteQuote();
                      }
                    }}
                  />
                  </>
                ) : ( null) 
                } 
            </div>
        </div>
        <div className="card-content">
            <h2 className="content-title">{post.title}</h2>
            <p className="content-txt">{post.content}</p>
            <img src={post.imageUrl && post.imageUrl} alt="" className="content-img" />
        </div>
        <div className="card-footer">
            <div className="footer-likedislike">
                <FontAwesomeIcon icon={faThumbsUp} className='like-icon' />
                <FontAwesomeIcon icon={faThumbsDown} className='dislike-icon' />
            </div>
            <button className="footer-btncomment">Commenter</button>
        </div>
    </div>
  )
}

export default Card;