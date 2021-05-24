export interface RaceFilter {
  umaName: string;
}

export type RaceFilterHandler = (filter: RaceFilter) => void;

export function createRaceFilter(
  initial: Partial<RaceFilter> = {}
): RaceFilter {
  return {
    umaName: initial?.umaName ?? "",
  };
}

export function isEmptyRaceFilter(filter: RaceFilter): boolean {
  if (filter.umaName !== "") {
    return false;
  }

  return true;
}
