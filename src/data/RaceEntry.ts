import { createDataRecord, DataRecord } from "../gp/data/DataRecord";
import { UmaClass } from "./Race";

export interface RaceEntry extends DataRecord {
  commentatorComment: string;
  expectations: ExpectationList;
  gutRank: TadunaRank;
  gutStatus: number;
  intelligenceRank: TadunaRank;
  intelligenceStatus: number;
  powerRank: TadunaRank;
  powerStatus: number;
  raceTitle: string;
  spGolshiChanMode2021?: boolean;
  speedRank: TadunaRank;
  speedStatus: number;
  staminaRank: TadunaRank;
  staminaStatus: number;
  tadunaComment: string;
  umaClass: UmaClass;
  umaName: string;
  userId: string;
  voteRank: number;
}

export type ExpectationLevel = typeof expectationLevels[number];

export type ExpectationList = [
  ExpectationLevel,
  ExpectationLevel,
  ExpectationLevel
];

export type TadunaRank = typeof tadunaRanks[number];

export type RaceEntryCallback = (entry: RaceEntry) => void;

export type TadunaRankCallback = (rank: TadunaRank) => void;

export type ExpectationLevelCallback = (level: ExpectationLevel) => void;

export const expectationLevels = [
  "great",
  "good",
  "maybe",
  "possibly",
  "none",
] as const;

export const tadunaRanks = ["great", "good", "ok", "poor"] as const;

const tadunaRankSymbolMap: Record<TadunaRank, string> = {
  good: "○",
  great: "◎",
  ok: "△",
  poor: "×",
};

const expectationSymbolMap: Record<ExpectationLevel, string> = {
  good: "○",
  great: "◎",
  maybe: "△",
  none: "―",
  possibly: "▲",
};

export function createRaceEntry(initial: Partial<RaceEntry> = {}): RaceEntry {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const oldFormat = initial as any;

  // named it as 2020 accidentally!
  const spGolshiChanMode2021 =
    initial.spGolshiChanMode2021 ?? oldFormat.spGolshiChanMode2020 ?? false;

  return {
    ...createDataRecord(initial),
    commentatorComment: initial.commentatorComment ?? "",
    expectations: initial.expectations ?? ["great", "great", "great"],
    gutRank: initial.gutRank ?? "great",
    gutStatus: initial.gutStatus ?? 0,
    intelligenceRank: initial.intelligenceRank ?? "great",
    intelligenceStatus: initial.intelligenceStatus ?? 0,
    powerRank: initial.powerRank ?? "great",
    powerStatus: initial.powerStatus ?? 0,
    raceTitle: initial.raceTitle ?? "",
    speedRank: initial.speedRank ?? "great",
    speedStatus: initial.speedStatus ?? 0,
    spGolshiChanMode2021,
    staminaRank: initial.staminaRank ?? "great",
    staminaStatus: initial.staminaStatus ?? 0,
    tadunaComment: initial.tadunaComment ?? "",
    umaClass: initial.umaClass ?? "ジュニア",
    umaName: initial.umaName ?? "",
    userId: initial.userId ?? "",
    voteRank: initial.voteRank ?? 1,
  };
}

export function tadunaRankToSymbol(rank: TadunaRank): string {
  return tadunaRankSymbolMap[rank];
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
export function isTadunaRank(rank: any): rank is TadunaRank {
  return tadunaRanks.includes(rank);
}

export function expectationListToSymbol(
  expectations: ExpectationList
): [string, string, string] {
  return [
    expectationToSymbol(expectations[0]),
    expectationToSymbol(expectations[1]),
    expectationToSymbol(expectations[2]),
  ];
}

export function expectationToSymbol(expectation: ExpectationLevel): string {
  return expectationSymbolMap[expectation];
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
export function isExpectationLevel(level: any): level is ExpectationLevel {
  return expectationLevels.includes(level);
}
