'use client';

import { Box, Skeleton, Typography } from "@mui/material";
import Image from "next/image";
import React, { useEffect, useState } from 'react';

const Restaurants: React.FC = () => {
  const [restaurantData, setRestaurantData] = useState([]);
  const [loadingRestaurant, setLoadingRestaurant] = useState(false);
  const [errorRestaurant, setErrorRestaurant] = useState<string | null>(null);

  useEffect(() => {
    const fetchRestaurantData = async () => {
      setLoadingRestaurant(true);
      setErrorRestaurant(null);
      
      try {
        const response = await fetch('http://localhost:3000/api/restaurants');
        console.log('Response:', response.restaurants);
        if (!response.ok) {
          throw new Error('Failed to fetch restaurant data');
        }
        
        const data = await response.json();
        setRestaurantData(data);
      } catch (err) {
        setErrorRestaurant(err.message);
      } finally {
        setLoadingRestaurant(false);
      }
    };

    fetchRestaurantData();
  }, []);
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 1,
      }}
    >
      <Typography variant="h2">Restaurant's</Typography>
      {restaurantData && restaurantData.restaurants ? (
        restaurantData.restaurants.map((restaurant: any) => (
          <Box
            key={restaurant.id}
            sx={{ 
              display: 'inline-flex',
              alignItems: 'center',
              marginBottom: 1,
              padding: [.25, 0.5],
              borderRadius: 1,
              border: '1px solid #ddd',
              width: 'fit-content',
              cursor: 'pointer',
            }}
            >
            <Typography variant="body2">{restaurant.name}</Typography>
          </Box>
        ))
      ) : (
        <Skeleton variant="rectangular" width="100%" height={300} />
      )}
    </Box>
  );
};

export default Restaurants;