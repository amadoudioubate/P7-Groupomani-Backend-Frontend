import React from "react";
import axios from "axios";
import cookie from "js-cookie";
import { faSignOut } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Logout.css';

const Logout = () => {

  const removeCookie = (key) => {
    if (window !== "undefined") {
      cookie.remove(key, { expires: 1 });
    }
  };

  const logout = async () => {
    await axios({
      method: "get",
      url: `http://localhost:3001/api/auth/logout`,
      withCredentials: true,
    })
      .then(() => removeCookie("jwt"))
      .catch((err) => console.log(err));
    
    window.location = "/profile";
  };

  return (
    <li onClick={logout} className="items" >
      
        <FontAwesomeIcon icon={faSignOut} /> 
        <span className="out">Se déconnecter</span>
      
    </li>                   
  );
};

export default Logout;