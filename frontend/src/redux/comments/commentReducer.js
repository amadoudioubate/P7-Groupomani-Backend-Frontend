import {
    GET_COMMENT, 
    ADD_COMMENT,
    UPDATE_COMMENT,
    DELETE_COMMENT,
  } from '../../actions/comments/commentActions';
  
  
  const INITIAL_STATE = { // Initialisation du state
      comments: [],
  };
    
  export default function commentReducer(state = INITIAL_STATE, action) {
      switch (action.type) {
        case ADD_COMMENT: // Ajouter un commentaire
          const newArr = [...state.comments];
          newArr.unshift(action.payload)
          return {
            ...state,
            comments: newArr,
          };
        case GET_COMMENT: // Récupérer un commentaire
          return action.payload;
        case UPDATE_COMMENT: // Modifier un commentaire
          return state.map(comment => {
              if(comment.id === action.payload.commentId) {
                  return {
                      ...state,
                      comments: action.payload
                  };
              } else {
                  return comment;
              }
          });
        case DELETE_COMMENT: // Supprimer un commentaire
          return state.filter(comment => comment.id !== action.payload.commentId);
        default:
          return state;
      }
      
  };
  