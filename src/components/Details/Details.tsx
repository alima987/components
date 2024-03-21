import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Details.scss';
import { Characters } from '../SearchResults/SearchResults';

const Details = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [detailsData, setDetailsData] = useState<Characters | null>(null);

  const fetchDetailsData = async (page: string) => {
    try {
      const response = await fetch(
        `https://rickandmortyapi.com/api/character/?page=${page}`
      );
      const data = await response.json();
      return data.results[0] as Characters;
    } catch (error) {
      console.error('Error fetching details:', error);
      return null;
    }
  };

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const page = searchParams.get('page');

    if (page) {
      fetchDetailsData(page).then((data) => {
        if (data) {
          setDetailsData(data);
        }
      });
    }
  }, [location]);

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
