import { Restaurant } from '@/domain/restaurant';
import searchClient from '../instances/algolia-search.client';

export class RestaurantApi {
  static async fetchRestaurants(query: string): Promise<Restaurant[]> {
    try {

      const response = await searchClient.search<Restaurant[]>({
        requests: [
          {
            indexName: 'data',
            query
          }
        ]
      })
      // @ts-expect-error: Algolia search response type mismatch
      return response.results[0].hits;
    } catch (error) {
      console.error('Error fetching restaurants:', error);
      throw new Error('Failed to fetch restaurants');
    }
  }
}

