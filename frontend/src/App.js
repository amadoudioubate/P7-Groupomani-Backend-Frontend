// import React, { useEffect, useState } from "react";
// import Routes from "./Components/Routes";
// import { AuthContext } from "./context/AuthContext";
// import axios from "axios";
// import { useDispatch } from "react-redux";
// import { getOneUser } from "./actions/users/userActions";

// const App = () => {
//   const [uid, setUid] = useState(null);
//   const dispatch = useDispatch();

//   useEffect(() => {
//     const fetchToken = async () => {
//       await axios({
//         method: "get",
//         url: `${process.env.REACT_APP_API_URL}jwtid`,
//         withCredentials: true,
//       })
//         .then((res) => {
//           setUid(res.data);
//         })
//         .catch((err) => console.log("No token"));
//     };
//     fetchToken();

//     if (uid) dispatch(getOneUser(uid));
//   }, [uid, dispatch]);

//   return (
//     <AuthContext.Provider value={uid}>
//       <Routes />
//     </AuthContext.Provider>
//   )
// }

// export default App;

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getUser } from './actions/users/userActions';
import Routes from './Components/Routes';
import { UidContext } from './context/UidContext';
import './App.css';

function App() {
  const [uid, setUid] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchToken = async () => {
      await axios({
        method: 'get',
        url: `${process.env.REACT_APP_API_URL}jwtid`,
        withCredentials: true,
      })
      .then(res => {
        setUid(res.data);
      })
      .catch(err => console.log('Pas de token'));
      
    }
    fetchToken();

    if(uid) dispatch(getUser(uid));
  }, [uid, dispatch]);

  return ( 
    <div className="App">
      <UidContext.Provider value={uid}>
        <Routes />
      </UidContext.Provider>
    </div>
  )
}

export default App;