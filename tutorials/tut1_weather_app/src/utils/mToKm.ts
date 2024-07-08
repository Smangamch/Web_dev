export function mToKm(vInMeters: number): string {
    const vInKm = vInMeters / 1000;
    return `${vInKm.toFixed(0)}km`;
}