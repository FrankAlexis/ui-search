import { RestaurantApi } from '@/infra/api/restaurant.api';

export class DeleteRestaurantsUseCase {
    static async execute(objectID: string): Promise<number> {
        return await RestaurantApi.deleteRestaurant(objectID);
    }
}
