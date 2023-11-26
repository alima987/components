import React from 'react';
import { Route, Routes } from 'react-router-dom';

import App from '../pages';
import Details from './Details';

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/search" element={<App />} />
      <Route path="/details" element={<Details />} />
    </Routes>
  );
};

export default Router;
