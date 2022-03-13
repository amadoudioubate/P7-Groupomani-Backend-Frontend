import axios from "axios";

export const GET_USER = "GET_USER";
export const UPDATE_BIO = "UPDATE_BIO";
export const UPDATE_USER = 'UPDATE_USER';
export const DELETE_USER = 'DELETE_USER';


export const getUser = (userId) => {
    return dispatch => {
        axios
        .get(`${process.env.REACT_APP_API_URL}api/user/${userId}`)
        .then(res => {
            dispatch({ type: GET_USER, payload: res.data })
        })
        .catch(err => console.log(err)) 
    }
};

export const updatejob = (userId, job) => {
    return (dispatch) => {
        axios({
            method: "put",
            url: `${process.env.REACT_APP_API_URL}api/user/` + userId,
            data: { job },
        })
        .then(() => {
            dispatch({ type: UPDATE_BIO, payload: job })
        })
        .catch(err => console.log(err)) 
    }
  };

//Modifier les info d'un utilisateur
export const updateUser = (userId, dataUser) => {
    return dispatch => {
        axios({
            method: 'put',
            url: `${process.env.REACT_APP_API_URL}api/user/${userId}`,
            data: { dataUser }
        })
        .then(()=> {
            dispatch({ type: UPDATE_USER, payload: dataUser })
        })
    }
};

// Supprimer un utilisateur
export const deleteUser = (userId) => {
    return dispatch => {
        axios({
            method: 'delete',
            url: `${process.env.REACT_APP_API_URL}api/user/${userId}`
        })
        .then(() => {
            dispatch({ type: DELETE_USER, payload: { userId }})
        })
    }
};

