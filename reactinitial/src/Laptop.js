import React, { useState } from 'react';

const Laptop = ({ laptop }) => {
  const [showDetails, setShowDetails] = useState(false);

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  return (
    <div>
      <div>{laptop.name}</div>
      <button onClick={toggleDetails}>{showDetails ? 'Show less' : 'Show more'}</button>
      {showDetails && (
        <div>
          <p>Brand: {laptop.brand}</p>
          <p>Weight: {laptop.weight}</p>
        </div>
      )}
    </div>
  );
};

export default Laptop;