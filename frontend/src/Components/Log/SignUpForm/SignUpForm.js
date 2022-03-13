// // import React, { useState } from "react";
// // import axios from "axios";
// // import LoginForm from "../LoginForm/LoginForm";

// // const SignUpForm = () => {
// //   const [formSubmit, setFormSubmit] = useState(false);
// //   const [firstName, setFirstName] = useState("");
// //   const [lastName, setLastName] = useState("");
// //   const [email, setEmail] = useState("");
// //   const [password, setPassword] = useState("");
 

// //   const handleSignUp = async (e) => {
// //     e.preventDefault();
// //     const terms = document.getElementById("terms");
// //     const firstNameError = document.querySelector(".firstName.error");
// //     const lastNameError = document.querySelector(".lastName.error");
// //     const emailError = document.querySelector(".email.error");
// //     const passwordError = document.querySelector(".password.error");
    
// //     const termsError = document.querySelector(".terms.error");

    
// //     termsError.innerHTML = "";

    

// //     if (!terms.checked) {
// //         termsError.innerHTML = "Veuillez valider les conditions générales";
// //     } else {
// //       await axios({
// //         method: "post",
// //         url: `http://localhost:3001/api/user/signup`,
// //         data: {
// //           firstName,
// //           lastName,
// //           email,
// //           password,
// //         },
// //       })
// //         .then((res) => {
// //           console.log(res);
// //           if (res.data.errors) {
// //             firstNameError.innerHTML = res.data.errors.firstName;
// //             lastNameError.innerHTML = res.data.errors.firstName;
// //             emailError.innerHTML = res.data.errors.email;
// //             passwordError.innerHTML = res.data.errors.password;
// //           } else {
// //             setFormSubmit(true);
// //           }
// //         })
// //         .catch((err) => console.log(err));
// //     }
// //   };

// //   return (
// //     <>
// //       {formSubmit ? (
// //         <>
// //           <LoginForm />
// //           <span></span>
// //           <h4 className="success">
// //             Enregistrement réussi, veuillez-vous connecter
// //           </h4>
// //         </>
// //       ) : (
// //         <form action="" onSubmit={handleSignUp} id="sign-up-form">
// //           <label htmlFor="firstName">Prénom</label>
// //           <br />
// //           <input
// //             type="text"
// //             name="firstName"
// //             id="firstName"
// //             onChange={(e) => setFirstName(e.target.value)}
// //             value={firstName}
// //             placeholder="Votre prénom"
// //           />
// //           <div className="firstName error"></div>
// //           <br />

// //           <label htmlFor="lastName">Nom</label>
// //           <br />
// //           <input
// //             type="text"
// //             name="lastName"
// //             id="lastName"
// //             onChange={(e) => setLastName(e.target.value)}
// //             value={lastName}
// //             placeholder="Votre nom"
// //           />
// //           <div className="lastName error"></div>
// //           <br />

// //           <label htmlFor="email">Email</label>
// //           <br />
// //           <input
// //             type="text"
// //             name="email"
// //             id="email"
// //             onChange={(e) => setEmail(e.target.value)}
// //             value={email}
// //             placeholder="Votre e-mail"
// //           />
// //           <div className="email error"></div>
// //           <br />

// //           <label htmlFor="password">Mot de passe</label>
// //           <br />
// //           <input
// //             type="password"
// //             name="password"
// //             id="password"
// //             onChange={(e) => setPassword(e.target.value)}
// //             value={password}
// //             placeholder="Mot de passe"
// //           />
// //           <div className="password error"></div>
// //           <br />
          
// //           <input type="checkbox" id="terms" />
// //           <label htmlFor="terms">
// //             J'accepte les{" "}
// //             <a href="/" target="_blank" rel="noopener noreferrer">
// //               conditions générales
// //             </a>
// //           </label>
// //           <div className="terms error"></div>
// //           <br />
          
// //           <input type="submit" value="S'inscrire" />
// //         </form>
// //       )}
// //     </>
// //   );
// // };

// // export default SignUpForm;

// import axios from 'axios';
// import React, { useState } from 'react'
// import LoginForm from '../LoginForm/LoginForm';

// function SignUpForm() {
//   const [formSubmit, setFormSubmit] = useState(false)
  
//   const [firstName, setFirstName] = useState('');
//   const [lastName, setLastName] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');

//   const handleSignup = async (e) => {
//     const terms = document.getElementById('terms');
//     const firstNameError = document.querySelector('.firstName.error');
//     const lastNameError = document.querySelector('.lastName.error');
//     const emailError = document.querySelector('.email.error');
//     const passwordError = document.querySelector('.password.error');
//     const termsError = document.querySelector('.terms.error');

//     terms.innerHTML = "";

//     if(!terms.checked) {
//       termsError.innerHTML = "Veuillez accepter les conditions générales"
//     } else {
//       try {
        
//         const res = await axios({
//           method: "post",
//           url: `${process.env.REACT_APP_API_URL}api/auth/signup`,
//           data: {
//             firstName,
//             lastName,
//             email,
//             password
//           }
//         })
//         console.log(res);
//         if(res.data.error) {
//           firstNameError.innerHTML = res.data.error.firstName;
//           lastNameError.innerHTML = res.data.error.lastName;
//           emailError.innerHTML = res.data.error.email;
//           passwordError.innerHTML = res.data.error.firstName;
//         } else {
//             setFormSubmit(true);
//         }
//       } catch (err) {
//         console.log(err);
//       }
//     }
//   };

//   return (
//     <>
//       {formSubmit ? (
//         <>
//           <LoginForm />
//           <p>Enregistrement reussi</p>
//         </>
//       ) : (
//         <form onSubmit={handleSignup}>
//           <label htmlFor="firstName">Prénom</label>
//           <input 
//             type="text" 
//             name="firstName" 
//             id="firstName" 
//             onChange={e => setFirstName(e.target.value)}
//             value={firstName}
//             placeholder="Prénom"
//             required
//           />
//           <div className="firstName error"></div>

//           <label htmlFor="lastName">Nom de Famille</label>
//           <input 
//             type="text" 
//             name="lastName" 
//             id="lastName" 
//             onChange={e => setLastName(e.target.value)}
//             value={lastName}
//             placeholder="Nom de famille"
//             required
//           />
//           <div className="lastName error"></div>

//           <label htmlFor="email">Adresse e-mail</label>
//           <input 
//             type="text" 
//             name="email" 
//             id="email" 
//             onChange={e => setEmail(e.target.value)}
//             value={email}
//             placeholder="Adresse e-mail"
//             required
//           />
//           <div className="email error"></div>

//           <label htmlFor="password">Mot de passe</label>
//           <input 
//             type="password" 
//             name="password" 
//             id="password" 
//             onChange={e => setPassword(e.target.value)}
//             value={password}
//             placeholder="Mot de passe"
//             required
//           />
//           <div className="password error"></div>

//           <input type="checkbox" name="terms" id="terms" />
//           <label htmlFor="terms">J'accepte les <a href="#" target="_blank"
//             rel="noopener noreferrer">conditions générales</a></label>
//           <div className="terms error"></div>

//           <input type="submit" value="S'inscrire" />
//         </form>
//       )}
      
//     </>
//   )
// }

// export default SignUpForm;

import React, { useRef, useState, useEffect } from 'react';
import LoginForm from '../LoginForm/LoginForm';
import './SignUpForm.css';

import axios from 'axios'
const EMAIL_REGEX = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;


function SignUpForm() {
    const [formSubmit, setFormSubmit] = useState(false);
    const [firstName, setFirstName] = useState('');
    const [validFirstName, setValidFirstName] = useState(false);
    
    const [lastName, setLastName] = useState('');
    const [validLastName, setValidLastName] = useState(false);
    
    const [email, setEmail] = useState('');
    const [validEmail, setValidEmail] = useState(false);
    
    const [password, setPassword] = useState('');
    const [validPassword, setValidPassword] = useState(false);

    const firstNameError = document.querySelector(".firstName.error");
    const lastNameError = document.querySelector(".lastName.error");
    const emailError = document.querySelector(".email.error");
    const passwordError = document.querySelector(".password.error");
    
    useEffect(() => {
        setValidEmail(EMAIL_REGEX.test(email));
    }, [email]);

    useEffect(() => {
      setValidPassword(PWD_REGEX.test(password));
    }, [password]);

    const handleSignup = async (e) => {
      e.preventDefault();

      /*const vEmail = EMAIL_REGEX.test(email);
      const vPassword = PWD_REGEX.test(password);
      if (!vEmail || !vPassword) {
        setErrMsg("Entrée invalide");
        return;
      }*/
      try {
        const res = await axios({
            method: "post",
            url: `${process.env.REACT_APP_API_URL}api/auth/signup`,
            data: {
              firstName,
              lastName,
              email,
              password
            }
        })
        
        console.log(JSON.stringify(res.data));
        
        
        //effacer les données dans les inputs
        setFirstName('');
        setLastName('');
        setEmail('');
        setPassword('');

        if (res.data.errors) {
          firstNameError.innerHTML = res.data.errors.firstName;
          lastNameError.innerHTML = res.data.errors.lastName;
          emailError.innerHTML = res.data.errors.email;
          passwordError.innerHTML = res.data.errors.password;
        } else {
          setFormSubmit(true);
        }
       
      } catch (err) {
        console.log(err);
      }
  };


  return (
    
      <>
          {formSubmit ? (
            <>
                <p className='success'>Enregistrement reussi</p>
                <LoginForm />
            </>
          ) : (
           <div className='container-signup'>
                <div className="signup-title">
                    <h2 className="title-txtsignup">S'inscrire</h2>
                    <span>C'est facile et rapide</span>
                </div>
                <div className="line"></div>
                <form className="signup-form" onSubmit={handleSignup}>
                    <div className="form-group">
                        <label htmlFor="firstName">Prénom</label>
                        <input type="text" 
                          value={firstName}
                          onChange={e => setFirstName(e.target.value)}
                          placeholder="Prénom"
                          required 
                          />
                    </div>
                    <div className="firstName error"></div>

                    <div className="form-group">
                        <label htmlFor="lastName">Nom</label>
                        <input type="text" 
                          value={lastName}
                          onChange={e => setLastName(e.target.value)}
                          placeholder="Nom de famille"
                          required 
                          />
                    </div>
                    <div className="lastName error"></div>

                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" 
                          value={email}
                          onChange={e => setEmail(e.target.value)}
                          autoComplete="off"
                          placeholder="votre e-mail"
                          required 
                          />
                    </div>
                    <div className="email error"></div>

                    <div className="form-group">
                        <label htmlFor="password">Mot de passe</label>
                        <input type="password"  id="password" 
                          value={password}
                          onChange={e => setPassword(e.target.value)}
                          placeholder="Nouveau mot de passe"
                          required
                          />
                    </div>
                    <div className="password error"></div>

                    <p className="form-conditiongeneral">En cliquant
                      sur S'inscire, vous acceptez nos <a href="#" className='link-politique'>Conditions générales. </a> 
                      Découvrez comment nous recueillons, utilisons et partageons vos données en lisant notre
                      <a href="#" className='link-politique'> Politique d'utilisation des données</a>.
                    </p>
                    <button className="btn-signup" type='submit'>S'inscrire</button>
                </form>
           </div>
        )}
      </>
       
  )
}

export default SignUpForm