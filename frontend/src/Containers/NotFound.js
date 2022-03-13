// import React from 'react';
// import { useNavigate } from 'react-router-dom';


// export default function NotFound() {

//   const navigate = useNavigate();

//   const navigateNotFound = () => {
//       navigate('/');
//   }

//   return (
//     <div>
//         <h1>Cette page n'existe pas</h1>
//         <button onClick={navigateNotFound}>
//             Retourner à l'acceuil
//         </button>
//     </div>
//   );
// }

import React from 'react';
import { useNavigate } from 'react-router-dom';

function NotFound() {

  const navigate = useNavigate();
  
  const handleBack = () => {
    navigate('/');
  }
  return (
    <div className='not-found'>
      <p>Page non trouvée</p>
      <button className="back"
      onClick={handleBack}>Rétourner à l'acceuil</button>
    </div>
  )
}

export default NotFound