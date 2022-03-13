
// import React, { useState } from 'react';
// import LoginForm from './LoginForm/LoginForm';
// import SignUpForm from './SignUpForm/SignUpForm';

// function Log() {
//   const [loginModal, setLoginModal] = useState(true);
//   const [signUpModal, setSignUpModal] = useState(false);

//   const handleModals = (e) => {
//     if(e.target.id === 'login') { // Si container login selectionné
//       setLoginModal(true);
//       setSignUpModal(false);
//     } else if (e.target.id === 'sign-up') { // Si container inscription selectionnée
//       setSignUpModal(true);
//       setLoginModal(false);
//     }
//   };

//   return (
//     <div className='connection-form'>
//       <div className="form-container">
//         <ul>
//             <li 
//               onClick={handleModals} 
//               id="login"
//               className={loginModal ? 'active-btn' : null }>
//               Connexion
//             </li>
//             <li 
//               onClick={handleModals} 
//               id="sign-up"
//               className={signUpModal ? 'active-btn' : null }>
//               S'inscrire
//             </li>
//         </ul>
//       </div> 
//       {loginModal && <LoginForm />}
//       {signUpModal && <SignUpForm /> }
//     </div>
//   )
// }

// export default Log