import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Details.css';

interface StarshipDetails {
  name: string;
  model: string;
  manufacturer: string;
}

const Details = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [detailsData, setDetailsData] = useState<StarshipDetails | null>(null);

  const fetchDetailsData = async (page: string) => {
    try {
      const response = await fetch(
        `https://swapi.dev/api/starships/?page=${page}`
      );
      const data = await response.json();
      return data.results[0] as StarshipDetails;
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
