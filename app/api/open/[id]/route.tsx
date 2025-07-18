import { cache } from '@/lib/cache';

export async function GET(
    request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = await params;

    const cacheKey = `open-${id}`;
    const cachedData = cache.get(cacheKey);
    if (cachedData) {
      console.log('Returning cached open data');
      return Response.json(cachedData);
    }

    const response = await fetch(`https://work-test-web-2024-eze6j4scpq-lz.a.run.app/api/open/${id}`);

    if (!response.ok) {
      throw new Error(`External API error: ${response.status}`);
    }
    
    const data = await response.json();
    cache.set(cacheKey, data, 10);
    console.log('Cached fresh open data');

    return Response.json(data);
  } catch (error) {
    console.error('Proxy error:', error);
    return Response.json(
      { error: 'Failed to fetch open with id' },
      { status: 500 }
    );
  }
}