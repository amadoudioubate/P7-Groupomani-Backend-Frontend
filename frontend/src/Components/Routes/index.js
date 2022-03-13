import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../../Containers/Home';
import Profile from '../../Containers/Profile';
import NotFound from '../../Containers/NotFound';
import NavBar from '../NavBar/NavBar';


const index = () => {
  return (
    <div>
      <NavBar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </div>
  );
};

export default index;