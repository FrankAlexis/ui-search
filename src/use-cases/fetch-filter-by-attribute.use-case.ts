import { Restaurant, RestaurantAttribute } from '@/domain/restaurant';
import { RestaurantApi } from '@/infra/api/restaurant.api';

export class FetchFilterByAttributeUseCase {
    static async execute(attribute: RestaurantAttribute): Promise<string[]> {
        const results = await RestaurantApi.fetchByAttribute(attribute);
        const list = results.map((restaurant: Restaurant) => restaurant[attribute] as string);
        return [...new Set(list)];
    }
}
