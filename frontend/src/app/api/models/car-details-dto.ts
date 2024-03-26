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
   * Color
   */
  color: string;

  /**
   * Country origin
   */
  countryOrigin: string;

  /**
   * Currency code
   */
  currencySymbol: string;

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
   * Type of gearbox
   */
  gearbox: 'Manual' | 'Automatic';

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
   * Uploaded date
   */
  uploadedDate: string;

  /**
   * Wheel drive type
   */
  wheelDriveType: 'AllWheelDrive' | 'FrontWheelDrive' | 'RearWheelDrive' | 'FourWheelDrive';
}
