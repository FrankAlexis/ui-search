import { Restaurant, RestaurantFormValues } from '@/domain/restaurant';
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
      console.log(response.results);
      // @ts-expect-error: Algolia search response type mismatch
      return response.results[0].hits;
    } catch (error) {
      console.error('Error fetching restaurants:', error);
      throw new Error('Failed to fetch restaurants');
    }
  }

  static async deleteRestaurant(objectID: string): Promise<number> {
    try {
      const response = await searchClient.deleteObject({
        indexName: 'data',
        objectID
      });
      return response.taskID
    } catch (error) {
      console.error('Error deleting restaurant:', error);
      throw new Error('Failed to delete the restaurant');
    }
  }

  static async addRestaurant(restaurant: RestaurantFormValues): Promise<string> {
    try {
      const response = await searchClient.saveObjects({
        indexName: 'data',
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

