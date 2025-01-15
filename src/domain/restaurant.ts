export interface Restaurant {
  objectID: string;
  name: string;
  address: string;
  area: string;
  city: string;
  country: string;
  image_url: string;
  mobile_reserve_url: string;
  payment_options: string[];
  phone: string;
  postal_code: string;
  price: number;
  reserve_url: string;
  state: string;
  _geoloc: Geoloc;
  food_type: string;
  stars_count: number;
  reviews_count: number;
  neighborhood: string;
  phone_number: string;
  price_range: string;
  dining_style: string;
  rounded_stars_count: number;
  [key: string]: unknown;
}
export type RestaurantAttribute = keyof Restaurant;

export interface Geoloc {
  lat: number;
  lng: number;
}

export type RestaurantFormValues = Omit<
  Restaurant,
  'objectID' | 'mobile_reserve_url' | '_geoloc' | 'postal_code' | 'state' | 'country'
>;