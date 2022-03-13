import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import { getPosts } from './actions/posts/postActions';
import { getUsers } from './actions/users/usersActions';
import './index.css';
import App from './App';



store.dispatch(getPosts());
store.dispatch(getUsers()); 

ReactDOM.render(
  //<React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>,
  //</React.StrictMode>,
  document.getElementById('root')
);


