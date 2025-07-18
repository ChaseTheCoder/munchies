'use client';

import { Box, Skeleton, Typography } from "@mui/material";
import Image from "next/image";
import React, { useEffect, useState } from 'react';

const Filter: React.FC = () => {
  const [filterData, setFilterData] = useState([]);
  const [loadingFilter, setLoadingFilter] = useState(false);
  const [errorFilter, setErrorFilter] = useState<string | null>(null);

  useEffect(() => {
    const fetchFilterData = async () => {
      setLoadingFilter(true);
      setErrorFilter(null);
      
      try {
        const response = await fetch('http://localhost:3000/api/filter');
        console.log('Response:', response.filters);
        if (!response.ok) {
          throw new Error('Failed to fetch filter data');
        }
        
        const data = await response.json();
        setFilterData(data);
      } catch (err) {
        setErrorFilter(err.message);
      } finally {
        setLoadingFilter(false);
      }
    };

    fetchFilterData();
  }, []);
  return (
    <Box
      sx={{
      backgroundColor: '#fff',
      border: '0.6px solid #ddd',
      padding: 1,
      borderRadius: 2,
      display: 'flex',
      flexDirection: 'column',
      gap: 1,
      }}
    >
      <Typography variant="body1" fontSize={32} component="h2">Filter</Typography>
      <Box
        sx={{
        backgroundColor: '#fff',
        padding: [1, 0],
        borderRadius: 2,
        display: 'flex',
        flexDirection: 'column',
        gap: 1,
        }}
      >
        <Typography variant="body2" fontSize={16} component="p">Food Category</Typography>
        {filterData && filterData.filters ? (
          filterData.filters.map((filter: any) => (
              <Box
              key={filter.id}
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
              <Typography variant="body2">{filter.name}</Typography>
            </Box>
          ))
        ) : (
          <Skeleton variant="rectangular" width="100%" height={500} />
        )}
      </Box>

    </Box>
  );
};

export default Filter;