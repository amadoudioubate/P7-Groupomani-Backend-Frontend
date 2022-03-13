import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addPost, getPosts } from '../../../actions/posts/postActions';
import './NewPostForm.css';

function NewPostForm() {
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("");
  const [postImageUrl, setPostImageUrl] = useState(null);
  const [file, setFile] = useState();
  
  // Selection du state userReducer
  const userData = useSelector(state => state.userReducer);
  const dispatch = useDispatch();
   
  // Fonction exécutée quand le formulaire sera envoyer au clic sur le  bouton ajouté
  const handlePost = async (e) => {
    e.preventDefault();
    if (title || content) {
      //Création d'un nouveau objet FormData post
      const data = new FormData();
      data.append('UserId', userData.id);
      data.append('title', title);
      data.append('content', content);
      data.append('imageUrl', postImageUrl);

      dispatch(addPost(data)); // On effectue l'action addPost pour ajouter post
      dispatch(getPosts()); // On récupère tous les posts
      setTitle("") // Vide input title
      setContent("");
      setPostImageUrl("");
    } else {
      alert("Veuillez entrer un titre et un message")
    } 
  };
 
  const cancelPost = async (e) => {
    e.preventDefault();
    setTitle("")
    setContent("");
    setPostImageUrl("");
    setFile("");
  };

  const handleImage = (e) => {
    setPostImageUrl(URL.createObjectURL(e.target.files[0]));
    setFile(e.target.files[0]);
  };
  

  return (
    <section className="container-formulaire">
        <form className="post-form">
            <div className="form-group">
                <label htmlFor="title">Titre</label>
                <input 
                  value={title}
                  onChange={(e => setTitle(e.target.value))}
                  type="text" 
                  id="title"
                  name="title"
                  placeholder="Titre"
                />
            </div>

            <div className="form-group">
                <label htmlFor="content">Contenu</label>
                <textarea 
                  value={content}
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
            <div className="container-btn-add-cancel">
              <button className="btn-cancelpost" onClick={cancelPost}>Annuler</button>
              <button className="btn-addpost" type="submit" onClick={handlePost}>
                Ajouter article
              </button>
            </div>
        </form>
    </section>
  )
}

export default NewPostForm;