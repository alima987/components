import React from 'react';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

import { setDetailsLoading } from '../reducers/starships';

interface StarshipDetails {
  name: string;
  model: string;
  manufacturer: string;
}

const Details = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const [detailsData, setDetailsData] = useState<StarshipDetails | null>(null);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const page = searchParams.get('page');

    if (page) {
      dispatch(setDetailsLoading(true));

      const fetchDetailsData = async (page: string) => {
        try {
          dispatch(setDetailsLoading(true));
          const response = await fetch(`https://swapi.dev/api/starships/?page=${page}`);
          const data = await response.json();
          dispatch(setDetailsLoading(false));
          return data.results[0] as StarshipDetails;
        } catch (error) {
          dispatch(setDetailsLoading(false));
          console.error('Error fetching details:', error);
          return null;
        }
      };

      fetchDetailsData(page).then((data) => {
        if (data) {
          setDetailsData(data);
        }
        dispatch(setDetailsLoading(false));
      });
    }
  }, [location, dispatch]);

  const handleCloseModal = () => {
    navigate('/search');
  };

  return (
    <div className="modal">
      <div className="modal-content">
        {detailsData ? (
          <>
            <span className="close" onClick={handleCloseModal}>
              &times;
            </span>
            <h2>{detailsData.name}</h2>
            <p>Model: {detailsData.model}</p>
            <p>Manufacturer: {detailsData.manufacturer}</p>
          </>
        ) : (
          <p>Loading details...</p>
        )}
      </div>
    </div>
  );
};

export default Details;
