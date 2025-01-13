import { Restaurant, RestaurantFormValues } from '@/domain/restaurant';
import searchClient from '../instances/algolia-search.client';

export class RestaurantApi {
  static async fetchRestaurants(query: string, indexName = 'data'): Promise<Restaurant[]> {
    try {
      const response = await searchClient.search<Restaurant[]>({
        requests: [
          {
            indexName,
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

  static async deleteRestaurant(objectID: string, indexName = 'data'): Promise<number> {
    try {
      const response = await searchClient.deleteObject({
        indexName,
        objectID
      });
      return response.taskID
    } catch (error) {
      console.error('Error deleting restaurant:', error);
      throw new Error('Failed to delete the restaurant');
    }
  }

  static async addRestaurant(restaurant: RestaurantFormValues, indexName = 'data'): Promise<string> {
    try {
      const response = await searchClient.saveObjects({
        indexName,
        objects: [restaurant],
        waitForTasks: true,
        batchSize: 1
      })
      return response[0].objectIDs[0];
    } catch (error) {
      console.error('Error adding restaurant:', error);
      throw new Error('Failed to add the restaurant');
    }
  }
}

