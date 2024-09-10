/* tslint:disable */
/* eslint-disable */
export interface FavouritesDto {

  /**
   * Car brand
   */
  brand: string;

  /**
   * How many C02 emissions does the car have
   */
  co2Emissions: number;

  /**
   * Country origin
   */
  countryOrigin: string;

  /**
   * Currency symbol
   */
  currencySymbol: string;

  /**
   * First registration date
   */
  firstRegistrationDate: string;

  /**
   * Average fuel consumption
   */
  fuelConsumptionCombined: number;

  /**
   * Fuel type
   */
  fuelType: 'Gasoline' | 'Diesel';

  /**
   * How many horse power does the car have
   */
  horsePower: number;

  /**
   * Car's ID
   */
  id: number;

  /**
   * Car's images
   */
  images: Array<string>;

  /**
   * Kilometers travelled since the first registration date
   */
  kilometersTravelled: number;

  /**
   * How many kilowatts does the car have
   */
  kilowatts: number;

  /**
   * Car model name
   */
  modelName: string;

  /**
   * Number of previous car owners
   */
  noOfPreviousOwners: number;

  /**
   * Car suggested price
   */
  price: number;

  /**
   * Seller type
   */
  sellerType: 'Dealer' | 'Private' | 'CompanyVehicle';

  /**
   * Type of transmission
   */
  transmission: 'Manual' | 'Automatic';
}
