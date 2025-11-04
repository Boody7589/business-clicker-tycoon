
const suffixes = ["", "K", "M", "B", "T", "Qa", "Qi", "Sx", "Sp", "Oc"];

export const formatNumber = (value: number): string => {
    if (value < 1000) {
        return value.toFixed(2).replace(/\.00$/, '');
    }

    const tier = Math.floor(Math.log10(value) / 3);

    if (tier >= suffixes.length) {
        return value.toExponential(2);
    }

    const suffix = suffixes[tier];
    const scale = Math.pow(10, tier * 3);
    const scaled = value / scale;

    return scaled.toFixed(2) + suffix;
};
