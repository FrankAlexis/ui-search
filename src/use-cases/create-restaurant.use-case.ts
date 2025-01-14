import { RestaurantFormValues } from '@/domain/restaurant';
import { RestaurantApi } from '@/infra/api/restaurant.api';

export class CreateRestaurantsUseCase {
    static async execute(object: RestaurantFormValues): Promise<string | undefined> {
        return await RestaurantApi.addRestaurant(object);
    }
}
