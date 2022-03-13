import {
  GET_POSTS, 
  GET_POST,
  ADD_POST,
  UPDATE_POST,
  DELETE_POST,
  GET_COMMENT_OF_POST,
  GET_LIKE_OF_POST
} from '../../actions/posts/postActions';


const INITIAL_STATE = []; // Initialisation du state
  
export default function postReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
      case ADD_POST: // Ajouter un post
        const newArr = [...state.posts];
        newArr.push(action.payload);
        return {
          ...state,
          posts: newArr,
        };
      case GET_POSTS: // Récupérer des posts
        return  action.payload
      case GET_POST: // Récupérer un post
        return action.payload;
      case UPDATE_POST: // Modifier un post
        return state.map(post => {
            if(post.id === action.payload.postId) {
                return {
                    ...state,
                    posts: action.payload
                };
            } else {
                return post;
            }
        });
      case DELETE_POST: // Supprimer un post
        return state.filter(post => post.id !== action.payload.postId);
      case GET_COMMENT_OF_POST: // Récupérer tous les commentaires d'un post
        return state.map(post => {
          if(post.id === action.payload.postId) {
            return {
              ...state,
              comments: action.payload
            }
          }
          return post;
        });
      case GET_LIKE_OF_POST: // Récupérer tous les likes d'un post
        return state.map(post => {
          if(post.id === action.payload.postId) {
            return {
              ...state,
              likes: action.payload
            }
          }
          return post;
        });
      default:
        return state;
    }
    
};
  

