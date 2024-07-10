/* tslint:disable */
/* eslint-disable */
export interface CarFilterDto {

  /**
   * Car's body style
   */
  bodyStyle?: 'Convertible' | 'Coupe' | 'Sedan' | 'SUV' | 'Hatchback';

  /**
   * Car's brand ID
   */
  brandId: number;

  /**
   * Car's fuel type
   */
  fuelType?: 'Gasoline' | 'Diesel';

  /**
   * Kilometers travelled FROM
   */
  kilometersTravelledFrom?: number;

  /**
   * Kilometers travelled TO
   */
  kilometersTravelledTo?: number;

  /**
   * Car's model ID
   */
  modelId?: number;

  /**
   * Page number
   */
  page: number;

  /**
   * Car's per page
   */
  perPage: number;

  /**
   * Power FROM
   */
  powerFrom?: number;

  /**
   * Power metric
   */
  powerMetric?: 'PS' | 'KW';

  /**
   * Power TO
   */
  powerTo?: number;

  /**
   * Price FROM
   */
  priceFrom?: number;

  /**
   * Price TO
   */
  priceTo?: number;

  /**
   * Type of transmission
   */
  transmission?: string;

  /**
   * Year registration FROM
   */
  yearRegistrationFrom?: number;

  /**
   * Year registration TO
   */
  yearRegistrationTo?: number;
}
