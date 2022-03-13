import { useState, useEffect, useContext } from 'react';
import { NavLink } from "react-router-dom";
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Avatar from '../../assets/images/avatar.jpg';
import './NavBar.css'
import { UidContext } from '../../context/UidContext';
import Logout from '../Log/Logout/Logout';
import { useSelector } from 'react-redux';

function NavBar() {
    const uid = useContext(UidContext)
    const [toggle, setToggle] = useState(false);
    const [largeur, setLargeur] = useState(window.innerWidth);
    
    const userData = useSelector((state) => state.userReducer);
    
    const toggleState = () => {
        setToggle(!toggle)
    }

    useEffect(() => {
       
        const changeWidth = () => {
            setLargeur(window.innerWidth);
        }

        window.addEventListener('resize', changeWidth);

        return () => {
            window.removeEventListener('resize', changeWidth);
        }

    }, []);

    return (
        <>
            {uid ? (
                <nav>
                {(toggle || largeur > 500) && (
                <ul className='liste'>
                    <li className='items'>
                        <NavLink to="/" className='items-user'>
                            Acceuil
                        </NavLink>
                    </li>
                    <li className='items'>
                        <NavLink to="/profile" className='items-user'>
                            <img src={userData.imageUrl ? userData.imageUrl : Avatar} alt="avatar" />
                            <span>{userData.firstName} {userData.lastName}</span>
                        </NavLink>
                    </li>
                    <Logout />
                </ul>
                )}
                
                <FontAwesomeIcon icon={faBars} 
                className='btn-responsive'
                onClick={toggleState}/>  
            </nav>
            ) : (
                null
            )}
        </>
        
    )
}

export default NavBar;