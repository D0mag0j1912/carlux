const FIFTY_THOUSAND_EUROS = 50000;
const ONE_HUNDRED_THOUSAND_EUROS = 100000;
const ENDING_PRICE = 500000;

export function generatePrices(): number[] {
    let prices: number[] = [];
    const fifty_thousand_increment = 5000;
    for (
        let price = fifty_thousand_increment;
        price < FIFTY_THOUSAND_EUROS;
        price += fifty_thousand_increment
    ) {
        prices = [...prices, price];
    }
    const one_hundred_thousand_increment = 10000;
    for (
        let price = FIFTY_THOUSAND_EUROS;
        price < ONE_HUNDRED_THOUSAND_EUROS;
        price += one_hundred_thousand_increment
    ) {
        prices = [...prices, price];
    }
    const five_hundred_thousand_increment = 100000;
    for (
        let price = ONE_HUNDRED_THOUSAND_EUROS;
        price <= ENDING_PRICE;
        price += five_hundred_thousand_increment
    ) {
        prices = [...prices, price];
    }
    return prices;
}
