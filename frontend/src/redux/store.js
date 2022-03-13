import { applyMiddleware, createStore, combineReducers } from "redux";
import postReducer from './posts/postReducer';
import userReducer from './users/userReducer';
import usersReducer from "./users/usersReducer";
import commentReducer from "./comments/commentReducer";
import thunk from 'redux-thunk';
// Developpement aide
import { composeWithDevTools } from "redux-devtools-extension";

const rootReducer = combineReducers({
    postReducer,
    userReducer,
    usersReducer,
    commentReducer
});

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

export default store;
