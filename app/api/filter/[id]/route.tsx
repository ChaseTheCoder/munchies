import { cache } from '@/lib/cache';

export async function GET(
    request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = await params;
      const cacheKey = `filter-${id}`;
    
    // Try to get from cache first
    const cachedData = cache.get(cacheKey);
    if (cachedData) {
      console.log(`Returning cached filter data for ID: ${id}`);
      return Response.json(cachedData);
    }
    
    const response = await fetch(`https://work-test-web-2024-eze6j4scpq-lz.a.run.app/api/filter/${id}`);

    if (!response.ok) {
      throw new Error(`External API error: ${response.status}`);
    }
    
    const data = await response.json();
    
    return Response.json(data);
  } catch (error) {
    console.error('Proxy error:', error);
    return Response.json(
      { error: 'Failed to fetch filter with id' },
      { status: 500 }
    );
  }
}