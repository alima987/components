import React from 'react';

import { Starship } from './CardList';

interface CardProps {
  item: Starship;
  onItemClick: (item: Starship) => void;
}

const Card: React.FC<CardProps> = ({ item, onItemClick }) => {
  return (
    <div key={item.name} onClick={() => onItemClick(item)} className="result-item">
      <h2>{item.name}</h2>
      <p>Model: {item.model}</p>
      <p>Manufacturer: {item.manufacturer}</p>
    </div>
  );
};

export default Card;
