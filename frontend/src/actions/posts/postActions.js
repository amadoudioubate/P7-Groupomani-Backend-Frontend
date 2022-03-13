import axios from "axios";

export const GET_POSTS = 'GET_POSTS';
export const GET_POST = 'GET_POST';
export const ADD_POST = 'ADD_POST';
export const UPDATE_POST = 'UPDATE_POST';
export const DELETE_POST = 'DELETE_POST';
export const GET_COMMENT_OF_POST = 'GET_COMMENT_OF_POST';
export const GET_LIKE_OF_POST = 'GET_LIKE_OF_POST';


// Récupérer tous les posts
export const getPosts = () => {
    return dispatch => {
        axios({
            method: "get",
            url: `${process.env.REACT_APP_API_URL}api/post`,
            headers: {"content-type": "application/json"}
        })
        .then(res => {
            dispatch({ type: GET_POSTS, payload: res.data })
        })
        .catch(err => console.log(err)) ;       
    }
};
 
// Ajouter un nouveau post 
export const addPost = (data) => {
    return dispatch => {
        axios
        .post(`${process.env.REACT_APP_API_URL}api/post`, data)
        .then(() => {
            dispatch({ type: ADD_POST, payload: data })
        })
        .catch(err => console.log(err));  
    }     
};

// Récupérer un post
export const getPost = (postId) => {
    return dispatch => {
        axios
          .get(`${process.env.REACT_APP_API_URL}api/post/${postId}`)
          .then(res => {
            dispatch({ type: GET_POST, payload: res.data });
          })
          .catch(err => console.log(err))  
    }      
};

//Modifier un post
export const updatePost = (postId, dataPost) => {
    return  dispatch => {
        axios({
            method: 'put',
            url: `${process.env.REACT_APP_API_URL}api/post/${postId}`,
            data: JSON.stringify(dataPost) 
        })
        .then(() => {
            dispatch({ type: UPDATE_POST, payload: { dataPost, postId } })
        })
        .catch(err => console.log(err))
    }
};

// Supprimer un post
export const deletePost = (postId) => {
    return dispatch => {
        axios({
            method: 'delete',
            url: `${process.env.REACT_APP_API_URL}api/post/${postId}`,
        })
        .then(() => {
            dispatch({ type: DELETE_POST, payload: { postId }})
        })
        .catch(err => console.log(err))      
    }
};

// // Récupérer tous les likes d'un post
// export const getCommentOfPost = (postId) => {
//     return (async dispatch => {
//         try {
//             const res = await axios.get(`${process.env.REACT_APP_API_URL}api/post/${postId}/comments`);
//             dispatch({ type: GET_COMMENT_OF_POST, payload: res.data });
//         } catch (err) {
//             return err;
//         }
//     });
// };

// // Récupérer tous les commentaires d'un post
// export const getLikeOfPost = (postId) => {
//     return (async dispatch => {
//         try {
//             const res = await axios.get(`${process.env.REACT_APP_API_URL}api/post/${postId}/likes`);
//             dispatch({ type: GET_LIKE_OF_POST, payload: res.data });
//         } catch (err) {
//             return err;
//         }
//     });
// };

