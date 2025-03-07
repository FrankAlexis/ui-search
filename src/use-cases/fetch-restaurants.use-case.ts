import { Restaurant } from '@/domain/restaurant';
import { RestaurantApi } from '@/infra/api/restaurant.api';

export class FetchRestaurantsUseCase {
  static async execute(query: string, food_type?: string): Promise<Restaurant[]> {
    return await RestaurantApi.fetchRestaurants(query, food_type);
  }
}
