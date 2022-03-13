

import { 
    GET_USER,
    UPDATE_BIO,
    UPDATE_USER,
    DELETE_USER,
} from "../../actions/users/userActions";

const INITIAL_STATE = {};

export default function userReducer(state=INITIAL_STATE, action) {
    switch (action.type) {
        case GET_USER: // Récupérer un utilisateur 
            return action.payload;
        case UPDATE_USER: // Modifier un utilisateur
            return {
                ...state,
                user: action.payload
            }   
        case DELETE_USER: // Supprimer un utilisateur
            return state.filter(user => user.id !== action.payload.id);
        case UPDATE_BIO:
            return {
                ...state,
                bio: action.payload,
            };
        default:
            return state;
    }
};