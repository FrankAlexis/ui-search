import { Restaurant } from '@/domain/restaurant';
import { RestaurantApi } from '@/infra/api/restaurant.api';

export class FetchRestaurantsUseCase {
  static async execute(): Promise<Restaurant[]> {
    return await RestaurantApi.fetchRestaurants();
  }
}
