// import axios from 'axios';

// export const GET_COMMENT = 'GET_COMMENT';
// export const ADD_COMMENT = 'GET_COMMENT';
// export const UPDATE_COMMENT = 'UPDATE_COMMENT';
// export const DELETE_COMMENT = 'DELETE_COMMENT';

// // Récupérer un commentaire
// export const getComment = (commentId) => {
//     return (async dispatch => {
//         try {
//             const res = await axios.get(`${process.env.REACT_APP_API_URL}api/comment/${commentId}`);
//             dispatch({ type: GET_COMMENT, payload: res.data });
//         } catch (err) {
//             return err;
//         }
//     });
// };

// // Ajouter un commentaire
// export const addComment = (postId, userId, content, firstName, lastName) => {
//     return (async dispatch => {
//         try {
//             const res = await axios({ 
//                 METHOD: 'POST',
//                 URL : `${process.env.REACT_APP_API_URL}api/comment`,
//                 data: { postId, userId, content, firstName, lastName }
//             });
//             dispatch({ type: ADD_COMMENT, payload: { postId, userId, content, firstName, lastName } });
//         } catch (err) {
            
//         }
//     });
// };


// // Modifier un commentaire
// export const updateComment = (commentId, postId, content) =>  {
//     return (async dispatch => {
//         try {
//             const res = await axios({
//                 METHOD: 'PUT',
//                 URL: `${process.env.REACT_APP_API_URL}api/comment/${commentId}`,
//                 data: { postId, content }
//             });
//             dispatch({ type: UPDATE_COMMENT, payload: { commentId, postId, content } })
//         } catch (err) {
//             return err;
//         }
//     });
// };

// // Supprimer un commentaire
// export const deleteComment = (commentId, postId) => {
//     return (async dispatch => {
//         try {
//             const res = await axios({
//                 METHOD: 'DELETE',
//                 URL: `${process.env.REACT_APP_API_URL}api/comment/${commentId}`,
//                 data: { postId }
//             });
//             dispatch({ type: DELETE_COMMENT, payload: { commentId, postId }})
//         } catch (err) {
//             return err;
//         }
//     });
// };