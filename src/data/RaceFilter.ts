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

export function filterRaces(
  source: Race[],
  raceFilter: RaceFilter,
  umaClass: UmaClass,
  month: number,
  ofMonth: OfMonth
): Race[] {
  return [...source]
    .filter(
      (v) =>
        v.umaClass === umaClass &&
        v.month === month &&
        v.ofMonth === ofMonth &&
        (!raceFilter.umaName ||
          raceFilter.milestonesEmphasized ||
          v.umaNames.includes(raceFilter.umaName)) &&
        (raceFilter.distanceCategories.length < 1 ||
          raceFilter.distanceCategories.includes(
            raceDistanceToCategory(v.distance)
          )) &&
        (raceFilter.grounds.length < 1 ||
          raceFilter.grounds.includes(v.ground)) &&
        (raceFilter.grades.length < 1 ||
          raceFilter.grades.includes(v.raceGrade))
    )
    .sort((v, u) => v.title.localeCompare(u.title))
    .sort(
      (v, u) =>
        raceGrades.indexOf(v.raceGrade) - raceGrades.indexOf(u.raceGrade)
    );
}
