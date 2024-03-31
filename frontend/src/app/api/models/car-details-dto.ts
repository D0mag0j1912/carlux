/* tslint:disable */
/* eslint-disable */
export interface CarDetailsDto {

  /**
   * Bodykit
   */
  bodyKit: string;

  /**
   * Body style
   */
  bodyStyle: 'Convertible' | 'Coupe' | 'Sedan' | 'SUV' | 'Hatchback';

  /**
   * Brand
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
   * Currency code
   */
  currencySymbol: string;

  /**
   * Engine code name
   */
  engineCodeName: string;

  /**
   * Exterior color
   */
  exteriorColor: string;

  /**
   * First registration date
   */
  firstRegistrationDate: string;

  /**
   * How much fuel does the car consumes
   */
  fuelConsumption: number;

  /**
   * Fuel type
   */
  fuelType: 'Gasoline' | 'Diesel';

  /**
   * How many horse power does the car have
   */
  horsePower: number;

  /**
   * ID
   */
  id: number;

  /**
   * Images
   */
  images: Array<string>;

  /**
   * Interior color
   */
  interiorColor: string;

  /**
   * How many kilometers travelled
   */
  kilometersTravelled: number;

  /**
   * How many kilowatts does the car have
   */
  kilowatts: number;

  /**
   * Model name
   */
  modelName: string;

  /**
   * Number of previous car owners
   */
  noOfPreviousOwners: number;

  /**
   * How many cylinders does the car have
   */
  numberOfCylinders: number;

  /**
   * Price
   */
  price: number;

  /**
   * Date on which the model has been released to the public
   */
  releaseDate: string;

  /**
   * How much the car rim size is
   */
  rimSize: number;

  /**
   * Seller type
   */
  sellerType: 'Dealer' | 'Private' | 'CompanyVehicle';

  /**
   * Type of transmission
   */
  transmission: 'Manual' | 'Automatic';

  /**
   * Uploaded date
   */
  uploadedDate: string;

  /**
   * Wheel drive type
   */
  wheelDriveType: 'AllWheelDrive' | 'FrontWheelDrive' | 'RearWheelDrive' | 'FourWheelDrive';
}
