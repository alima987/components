import React from 'react';
import { Characters } from './CardList';
import './SearchResults.scss';

interface CardProps {
  item: Characters;
  onItemClick: (item: Characters) => void;
}

const Card: React.FC<CardProps> = ({ item, onItemClick }) => {
  return (
    <div key={item.name} onClick={() => onItemClick(item)} className="card">
      <div className="img_card">
        <img src={item.image} className="card_img" />
      </div>
      <div className="card_item">
        <h2>{item.name}</h2>
        <p>Species: {item.species}</p>
        <p>Gender: {item.gender}</p>
        <p>Last known location: {item.location.name}</p>
      </div>
    </div>
  );
};

export default Card;
