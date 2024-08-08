/* tslint:disable */
/* eslint-disable */
export interface CarListDto {
    /**
     * Car brand
     */
    brand: string;

    /**
     * Country from which the car originates
     */
    countryOrigin: string;

    /**
     * Currency symbol
     */
    currencySymbol: string;

    /**
     * Date on which the car is registered for the first time
     */
    firstRegistrationDate: string;

    /**
     * Car ID
     */
    id: number;

    /**
     * Car images
     */
    images: Array<string>;

    /**
     * Is car added to the favourites list
     */
    isFavourite: boolean;

    /**
     * Kilometers travelled since the first registration date
     */
    kilometersTravelled: number;

    /**
     * Car model name
     */
    modelName: string;

    /**
     * Number of previous owners
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
}
