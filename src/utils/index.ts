export function sgToPlato(sg: number) {
    return -1 * 616.868 + 1111.14 * sg - 630.272 * sg ** 2 + 135.997 * sg ** 3;
}

export function platoToSg(plato: number) {
    return 1 + plato / (258.6 - (plato / 258.2) * 227.1);
}

export function abv(og: number, fg: number) {
    return ((76.08 * (og - fg)) / (1.775 - og)) * (fg / 0.794);
}

export function fgFromAbv(og: number, abv: number) {
    const [root1, root2] = roots(
        76.08,
        -76.08 * og,
        0.794 * abv * (1.775 - og)
    );

    return sgToPlato(Math.max(root1, root2));
}

export function roots(a: number, b: number, c: number) {
    const d = b * b - 4 * a * c;

    return [(-b + Math.sqrt(d)) / (2 * a), (b + Math.sqrt(d)) / (2 * a)];
}

export const NULL_FG = 1.002;
