import raceMaster from "./raceMaster.json";

export interface Race {
  direction: RaceDirection;
  distance: number;
  ground: "芝" | "ダート";
  month: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
  ofMonth: "前半" | "後半";
  raceGrade: RaceGrade;
  title: string;
  siteName: string;
  umaGrade: UmaGrade;
  umaNames: string[];
}

export type UmaGrade = typeof umaGrades[number];

export type RaceDirection = typeof raceDirections[number];

export type RaceGrade = typeof raceGrades[number];

export const umaGrades = ["ジュニア", "クラシック", "シニア"];

export const raceDirections = [
  "左",
  "左・内",
  "左・外",
  "右",
  "右・外",
  "右・内",
  "直線",
] as const;

export const raceGrades = ["G1", "G2", "G3", "OP", "Pre-OP"] as const;

export const races = raceMaster as Race[];

export const raceDistance = toCandidates(
  races.map((v) => v.distance),
  compareNumber
);

export const siteName = toCandidates(
  races.map((v) => v.siteName),
  compareString
);

export const umaNames = toCandidates(
  races.flatMap((v) => v.umaNames),
  compareString
);

export const raceTitles = toCandidates(
  races.map((v) => v.title),
  compareString
);

export function isValidRaceTitle(title: string): boolean {
  return races.some((v) => v.title === title);
}

function toCandidates<T>(arr: T[], comparator: (v: T, u: T) => number) {
  return Array.from(new Set(arr)).sort(comparator);
}

function compareString(v: string, u: string) {
  return v.localeCompare(u);
}

function compareNumber(v: number, u: number) {
  return v - u;
}
