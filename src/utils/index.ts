export function sgToPlato(sg: number) {
    return -1 * 616.868 + 1111.14 * sg - 630.272 * sg ** 2 + 135.997 * sg ** 3;
}

export function platoToSg(plato: number) {
    return 1 + plato / (258.6 - (plato / 258.2) * 227.1);
}

export function abv(ogSg: number, fgSg: number) {
    return ((76.08 * (ogSg - fgSg)) / (1.775 - ogSg)) * (fgSg / 0.794);
}

export function fgFromOgAbv(ogSg: number, abv: number) {
    const [root1, root2] = roots(
        76.08,
        -76.08 * ogSg,
        0.794 * abv * (1.775 - ogSg)
    );

    return Math.max(root1, root2);
}

export function ogFromFgAbv(fgSg: number, abv: number) {
    return (
        (76.08 * fgSg * fgSg + 1.775 * 0.794 * abv) /
        (76.08 * fgSg + 0.794 * abv)
    );
}

export function roots(a: number, b: number, c: number) {
    const d = b * b - 4 * a * c;

    return [(-b + Math.sqrt(d)) / (2 * a), (b + Math.sqrt(d)) / (2 * a)];
}

export function pHFruits(moles: number) {
    return (1 / 2) * FRUIT_ACID_PKA - (1 / 2) * Math.log10(moles);
}

export const DRY_FG = 0.995;

export const FRUCTOSE_DENSITY = 1.69;

export const FRUIT_ACID_DENSITY = 1.6;

export const FRUIT_ACID_G_MOL = 134.09;

export const FRUIT_ACID_PKA = 3.51;

export const CO2_G_MOL = 44.01;

export const CO2_GRAMMS_PER_LITER_OPTIMAL = 5;

export const ETHANOL_DENSITY = 0.78945;

export const ETHANOL_G_MOL = 46.069;