import React, { useState, useEffect } from 'react';
import LoadingMask from './Loadingmask';
import Laptop from './Laptop';
import Button from '@mui/material-next/Button';


const MainComponent = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(null);
  const [sortDirection, setSortDirection] = useState('asc');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://demoapi.com/api/laptop');
        const data = await response.json();
        setData(data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setIsLoading(false);
      }
    };

    const timer = setTimeout(() => {
      fetchData();
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const toggleSortDirection = () => {
    setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
  };

  const handleSearchTermChange = (event) => {
    setSearchTerm(event.target.value);
  };

  let laptopsToDisplay = [];
  if (data) {
    laptopsToDisplay = data
      .filter((laptop) => laptop.name.toLowerCase().includes(searchTerm.toLowerCase()))
      .sort((a, b) => {
        if (sortDirection === 'asc') {
          return a.weight - b.weight;
        } else {
          return b.weight - a.weight;
        }
      });
  }

  return (
    <div>
      <h1>
        <button onClick={toggleSortDirection}>Sort</button>
      </h1>
      <input type="text" placeholder="Search by name" value={searchTerm} onChange={handleSearchTermChange} />
      {isLoading ? (
        <LoadingMask />
      ) : (
        <div>
          {laptopsToDisplay.map((laptop, index) => (
            <Laptop key={index} laptop={laptop} />
          ))}
        </div>
      )}
    </div>
  );
};

export default MainComponent;
