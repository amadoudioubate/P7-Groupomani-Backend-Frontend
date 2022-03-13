
// import React, { useState, useRef, useContext } from 'react';
// import axios from 'axios';
// import './LoginForm.css';
// import { UidContext } from '../../../context/UidContext';

// function LoginForm() {
  

//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');

//   // const emailErrorRef = useRef();
//   // const pwdErrorRef = useRef();
//   // console.log(emailErrorRef);
//   const emailError = document.querySelector('.email.error');
//   const pwdError = document.querySelector('.password.error');

//   const handleLogin = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await axios({
//         method: 'post',
//         url: `${process.env.REACT_APP_API_URL}api/auth/login`,
//         withCredentials: true,
//         data: {
//           email,
//           password
//         }
//       });
//       console.log(response);
     
//       //localStorage.setItem('token', JSON.stringify(response));
//       //console.log(response);
//       //localStorage.setItem('user', JSON.stringify(response));
//       if(response.data.error) {
//         // emailErrorRef.current.innerHTML = response.data.error.email;
//         // pwdErrorRef.current.innerHTML = response.data.error.password;
//         emailError.innerHTML = response.data.error;
//         pwdError.innerHTML = response.data.error;
//       } else {
//         window.location = '/';
//       }
//       // emailErrorRef.current.focus();
//       // pwdErrorRef.current.focus();
//     } catch (error) {
//       console.log(error);
//     } 
//   };

//   return (
//     <form action="" onSubmit={handleLogin} id="sign-up-form">
//       <label htmlFor="email">Email</label>
//       <input 
//         type="text" 
//         id="email" 
//         onChange={e => setEmail(e.target.value)}
//         value={email}
//         placeholder='Votre E-mail'
//       />
//       <div className="email error"></div>

//       <label htmlFor="password">Mot de passe</label>
//       <input 
//         type="password" 
//         id="password" 
//         onChange={e => setPassword(e.target.value)}
//         value={password}
//         placeholder='Mot de passe'
//       />
//       <div className="password error"></div>

//       <input type="submit" value="Se connecter" />  
//     </form>
//   )
// }

// export default LoginForm

import React, { useContext, useState, useRef, useEffect } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import SignUpForm from '../SignUpForm/SignUpForm';
import './LoginForm.css';


function LoginForm() {
    const errRef = useRef();
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [modalIsOpen, setIsOpen] = useState(false);

    function openModal() {
        setIsOpen(true);
    }
    
    function closeModal() {
        setIsOpen(false);
    }

    useEffect(() => {
        setErrMsg('');
    }, [email, password]);

    const handleLogin = async (e) => {
        e.preventDefault();
        const emailError = document.querySelector(".email.error");
        const passwordError = document.querySelector(".password.error");
      
        try {
            const res = await axios({
              method: 'post',
              url: `${process.env.REACT_APP_API_URL}api/auth/login`,
              withCredentials: true,
              data: {
                email,
                password
              }
            });
            console.log(res);
            setEmail('');
            setPassword('');
           
            if(res.data.errors) {
                emailError.innerHTML = res.data.errors.email;
                passwordError.innerHTML = res.data.errors.password;
            } else {
                window.location = '/';
            }
          } catch (err) {
            console.log(err);
        };    
    };


    const customStyles = {
        content: {
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
          transform: 'translate(-50%, -50%)',
        },
    };

    
    Modal.setAppElement('#root');
    
  return (
    <>
        {/* <section className='container'> */}
            <div className='container-login'>
                <div className="login-title">
                    <h2 className="title-txtlogin">Connexion</h2>
                    <span>Avec Groupomania, restez en contact avec vos collègues.</span>
                </div>
                <div className="line"></div>
                <form className="login-form" onSubmit={handleLogin}>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input type="text" id="email"
                          value={email}
                          onChange={e => setEmail(e.target.value)}
                          autoComplete="off"
                          placeholder="Adresse e-mail"
                          required 
                        />
                    </div>
                    <div className="email error"></div>

                    <div className="form-group">
                        <label htmlFor="password">Mot de passe</label>
                        <input type="password"  id="password" 
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        placeholder="Mot de passe"
                        required/>
                    </div>
                    <div className="password error"></div>

                    <button className="btn-login" type='submit'>Se connecter</button>
                    <div className="password-forgot">
                        <a href="#">Mot de passe oublié ?</a>
                    </div>
                    
                    <div className="line"></div>
                    
                </form>

                <button className="btn-create-an-account" onClick={openModal}>
                        Créer un nouveau Compte
                </button>
                <Modal
                  isOpen={modalIsOpen}
                //   onAfterOpen={afterOpenModal}
                  onRequestClose={closeModal}
                  style={customStyles}
                  contentLabel="Example Modal"
                >
                    <button onClick={closeModal}>close</button>
                    <SignUpForm />
                </Modal>
                
            </div>
            
        {/* </section> */}
        
    </>
  )
};

export default LoginForm;