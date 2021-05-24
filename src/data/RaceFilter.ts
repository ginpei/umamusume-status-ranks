import {
  OfMonth,
  Race,
  RaceDistanceCategory,
  raceDistanceToCategory,
  RaceGrade,
  raceGrades,
  RaceGround,
  UmaClass,
} from "./Race";

export interface RaceFilter {
  distanceCategories: RaceDistanceCategory[];
  milestonesEmphasized: boolean;
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
    milestonesEmphasized: initial?.milestonesEmphasized ?? false,
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

export function matchRaceFilter(race: Race, filter: RaceFilter): boolean {
  return (
    (!filter.umaName ||
      filter.milestonesEmphasized ||
      race.umaNames.includes(filter.umaName)) &&
    (filter.distanceCategories.length < 1 ||
      filter.distanceCategories.includes(
        raceDistanceToCategory(race.distance)
      )) &&
    (filter.grounds.length < 1 || filter.grounds.includes(race.ground)) &&
    (filter.grades.length < 1 || filter.grades.includes(race.raceGrade))
  );
}
