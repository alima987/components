import React from 'react';
import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Details.scss';
import { useDispatch } from 'react-redux';
import { setDetailsLoading } from '../../reducers/characters';
import { Characters } from '../SearchResults/CardList';

const Details = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const [detailsData, setDetailsData] = useState<Characters | null>(null);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const page = searchParams.get('page');

    if (page) {
      dispatch(setDetailsLoading(true));

      const fetchDetailsData = async (page: string) => {
        try {
          dispatch(setDetailsLoading(true));
          const response = await fetch(
            `https://rickandmortyapi.com/api/character/?page=${page}`
          );
          const data = await response.json();
          dispatch(setDetailsLoading(false));
          return data.results[0] as Characters;
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
    navigate('/name');
  };

  return (
    <div className="modal">
      <div className="modal-content">
        {detailsData ? (
          <>
            <span className="close" onClick={handleCloseModal}>
              &times;
            </span>
            <div>
              <img src={detailsData.image} className="details_img" />
            </div>
            <h2>{detailsData.name}</h2>
            <p>Species: {detailsData.species}</p>
            <p>Gender: {detailsData.gender}</p>
            <p>Last known location: {detailsData.location.name}</p>
          </>
        ) : (
          <p>Loading details...</p>
        )}
      </div>
    </div>
  );
};

export default Details;
