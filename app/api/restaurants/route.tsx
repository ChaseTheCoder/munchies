import { cache } from '@/lib/cache';

export async function GET() {
  const cacheKey = 'restaurants';
  const cachedData = cache.get(cacheKey);
  if (cachedData) {
    console.log('Returning cached restaurant data');
    return Response.json(cachedData);
  }

  try {
    const response = await fetch('https://work-test-web-2024-eze6j4scpq-lz.a.run.app/api/restaurants');
    
    if (!response.ok) {
      throw new Error(`External API error: ${response.status}`);
    }
    
    const data = await response.json();
    cache.set(cacheKey, data, 10);
    console.log('Cached fresh restaurant data');
    
    return Response.json(data);
  } catch (error) {
    console.error('Proxy error:', error);
    return Response.json(
      { error: 'Failed to fetch restaurants' },
      { status: 500 }
    );
  }
}