export function convWindSpeed(spInMetersPerSec:number):string{
    const spInKmPerHr=spInMetersPerSec*3.6;
    return `${spInKmPerHr.toFixed(0)}km/h`
}