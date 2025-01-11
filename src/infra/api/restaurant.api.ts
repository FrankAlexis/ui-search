import { Restaurant } from '@/domain/restaurant';
import axios from 'axios';

const MOCK_DATA_URL =
  'https://raw.githubusercontent.com/Jerska/front-end-test/master/dataset/restaurants.json';

export class RestaurantApi {
  static async fetchRestaurants(): Promise<Restaurant[]> {
    try {
      const response = await axios.get<Restaurant[]>(MOCK_DATA_URL);
      return response.data.slice(0, 10);
    } catch (error) {
      console.error('Error fetching restaurants:', error);
      throw new Error('Failed to fetch restaurants');
    }
  }
}
