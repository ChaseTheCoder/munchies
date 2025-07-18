import Nav from './components/nav'
import Filter from './components/filter'
import { Box, Grid } from '@mui/material'
import Categories from './components/categories';
import Restaurants from './components/restaurants';

export default function Home() {
  return (
    <div>
      <main>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            height: '100vh',
          }}
          margin={[8,6]}
        >
          <Nav />
          <Grid container spacing={2}>
            <Grid size={2}>
              <Filter />
            </Grid>
            <Grid size={10} gap={8}>
              <Categories />
              <Restaurants />
            </Grid>
          </Grid>
        </Box>
      </main>
    </div>
  );
}
