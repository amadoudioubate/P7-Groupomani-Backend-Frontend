import { GET_USERS } from "../../actions/users/usersActions";

const INITIAL_STATE = {}; // Initialisation du state

export default function usersReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case GET_USERS: // Récupérer des utilisateurs
      return action.payload;
    default:
      return state;
  }
}