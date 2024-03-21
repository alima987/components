import { Routes, Route } from 'react-router-dom';
import App from '../App';
import Details from './Details/Details';

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
