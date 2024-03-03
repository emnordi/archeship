import { ShipLocation } from '../types/Enums';

export function getTimeInseconds(minutes: number, seconds: number) {
  return minutes * 60 + seconds;
}

export function minutesAndSeconds(seconds: number) {
  return {
    minutes: Math.floor(seconds / 60),
    seconds: seconds % 60,
  };
}

export function getTravelTime(startLocation: ShipLocation) {
  return startLocation === ShipLocation.AUSTERA ? getTimeInseconds(10, 22) : getTimeInseconds(10, 48);
}

export function oppositeLocation(startLocation: ShipLocation) {
  return startLocation === ShipLocation.AUSTERA ? ShipLocation.TWO_CROWNS : ShipLocation.AUSTERA;
}
