export function isNeverCheck(_x: never): never {
    throw new Error("Didn't expect to get here");
}
