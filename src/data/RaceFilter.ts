import { RaceDistanceCategory, RaceGrade, RaceGround } from "./Race";

export interface RaceFilter {
  distanceCategories: RaceDistanceCategory[];
  grades: RaceGrade[];
  grounds: RaceGround[];
  umaName: string;
}

export type RaceFilterHandler = (filter: RaceFilter) => void;

export function createRaceFilter(
  initial: Partial<RaceFilter> = {}
): RaceFilter {
  return {
    distanceCategories: initial?.distanceCategories ?? [],
    grades: initial?.grades ?? [],
    grounds: initial?.grounds ?? [],
    umaName: initial?.umaName ?? "",
  };
}

export function isEmptyRaceFilter(filter: RaceFilter): boolean {
  if (filter.umaName !== "") {
    return false;
  }

  if (filter.distanceCategories.length > 0) {
    return false;
  }

  if (filter.grades.length > 0) {
    return false;
  }

  if (filter.grounds.length > 0) {
    return false;
  }

  return true;
}
