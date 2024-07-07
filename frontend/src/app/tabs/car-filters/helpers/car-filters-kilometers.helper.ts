const STARTING_KILOMETERS = 2500;
const FIVE_THOUSAND_KILOMETERS = 5000;
const ONE_HUNDRED_THOUSAND_KILOMETERS = 100000;
const ENDING_KILOMETERS = 200000;

export function generateKilometers(): number[] {
    let kilometers: number[] = [STARTING_KILOMETERS, FIVE_THOUSAND_KILOMETERS];
    const one_hundred_thousand_increment = 10000;
    for (
        let price = one_hundred_thousand_increment;
        price < ONE_HUNDRED_THOUSAND_KILOMETERS;
        price += one_hundred_thousand_increment
    ) {
        kilometers = [...kilometers, price];
    }
    const twenty_five_thousand_kilometers = 25000;
    for (
        let price = ONE_HUNDRED_THOUSAND_KILOMETERS;
        price <= ENDING_KILOMETERS;
        price += twenty_five_thousand_kilometers
    ) {
        kilometers = [...kilometers, price];
    }
    return kilometers;
}
