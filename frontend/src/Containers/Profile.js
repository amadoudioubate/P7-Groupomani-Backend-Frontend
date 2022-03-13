// import React, { useContext } from "react";
// import Logged from "../Components/Logged/Logged";
// import { AuthContext } from "../context/AuthContext";
// import UpdateProfil from "../Components/Profil/UpdateProfil/UpdateProfil";

// const Profil = () => {
//   const uid = useContext(AuthContext);

//   return (
//     <div className="profil-page">
//       {uid ? (
//         <UpdateProfil />
//       ) : (
//         <div className="log-container">
//           <Logged signin={false} signup={true} />
//           <div className="img-container">
//             <img src="./img/log.svg" alt="img-log" />
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Profil;

import React, { useContext } from 'react';
import LoginForm from '../Components/Log/LoginForm/LoginForm';
import LogoGroupomania from '../Components/LogoGroupomania/LogoGroupomania';
import { UidContext } from '../context/UidContext';
import UpdateProfile from '../Components/Profile/ShowProfile/ShowProfile'; 
import QuoiDeNeuf from '../Components/QuoiDeNeuf/QuoiDeNeuf';


function Profile() {

  const uid = useContext(UidContext);
 

  return (
    <div className='container-profile'>
      {uid ? (
        <>
          <QuoiDeNeuf />
          <UpdateProfile />
        </>
      ) : (
        <div className="profile-log">
          {/* <Log login={true} signup={false}/> */}
          <LogoGroupomania />
          <LoginForm />
        </div> 
      )}  
    </div>
  )
}

export default Profile;