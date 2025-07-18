'use client';

import { Box, Skeleton, Typography } from "@mui/material";
import Image from "next/image";
import React, { useEffect, useState } from 'react';

const Categories: React.FC = () => {
  const [filterData, setFilterData] = useState([]);
  const [loadingFilter, setLoadingFilter] = useState(false);
  const [errorFilter, setErrorFilter] = useState<string | null>(null);
  const url = 'https://work-test-web-2024-eze6j4scpq-lz.a.run.app/';

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
      display: 'flex',
      flexDirection: 'row',
      gap: 3,
      }}
    >
      {filterData && filterData.filters && !loadingFilter ? (
        filterData.filters.map((filter: any) => (
          <Box
            key={filter.id}
            sx={{ 
              display: 'inline-flex',
              alignItems: 'center',
              marginBottom: 1,
              padding: [1],
              borderRadius: 1,
              border: '1px solid #ddd',
              width: 'fit-content',
              cursor: 'pointer',
              backgroundColor: '#fff',
            }}
          >
            <Typography fontSize={14} component="p">{filter.name}</Typography>
            {/* <Image
              src={`${url}${filter.image_url}`}
              alt={filter.name}
              width={24}
              height={24}
              style={{ marginLeft: 8, borderRadius: '50%' }}
            /> */}
          </Box>
        ))
      ) : (
        <Skeleton variant="rectangular" width="100%" height={50} />
      )}
    </Box>
  );
};

export default Categories;