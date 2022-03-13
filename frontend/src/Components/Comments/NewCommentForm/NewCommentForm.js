import React from 'react';
import './FormComment.css';

function FormAddPost() {
  return (
    <section className="container-formulaire">
        <form className="comment-form">
            
            <div className="form-group">
                <label htmlFor="content">Contenu</label>
                <textarea name="" id="content" cols="30" rows="10"
                placeholder="Votre contenu"></textarea>
            </div>
            
            <button className="btn-comment">Ajouter commentaire</button>
        </form>
    </section>
  )
}

export default FormAddPost