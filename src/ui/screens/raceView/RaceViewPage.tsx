import { useMemo } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { RaceEntry } from "../../../data/RaceEntry";
import { useRaceEntriesByTitle } from "../../../data/raceEntryHook";
import { db } from "../../../gp-firebase/firebase";
import { TitledField } from "../../stable/TitledField";
import { BasicLayout } from "../basicLayout/BasicLayout";
import { entryListPagePath } from "../entryList/EntryListPage";
import { raceListPagePath } from "../raceList/RaceListPage";
import { registerPagePathWithQuery } from "../register/RegisterPage";
import styles from "./RaceViewPage.module.scss";
import { Result, ResultsBar } from "./ResultsBar";

export function raceViewPagePath(raceTitle: string): string {
  return `${raceListPagePath()}${raceTitle}/`;
}

export const RaceViewPage: React.FC = () => {
  const { raceTitle } = useParams<{ raceTitle: string }>();
  const entries = useRaceEntriesByTitle(db, raceTitle);

  const title = `${raceTitle}`;

  return (
    <BasicLayout title={title}>
      <h1>{title}</h1>
      <p>
        <Link to={entryListPagePath(raceTitle)}>登録済みのもの一覧</Link>
        {" | "}
        <Link to={registerPagePathWithQuery({ raceTitle })}>追加</Link>
      </p>
      {entries && <RaceViewPageContent entries={entries} />}
    </BasicLayout>
  );
};

const RaceViewPageContent: React.FC<{ entries: RaceEntry[] }> = ({
  entries,
}) => {
  const speedResults: Result[] = useMemo(() => {
    return entries.map((v) => ({
      entryId: v.id,
      rank: v.speedRank,
      status: v.speedStatus,
    }));
  }, [entries]);

  const staminaResults: Result[] = useMemo(() => {
    return entries.map((v) => ({
      entryId: v.id,
      rank: v.staminaRank,
      status: v.staminaStatus,
    }));
  }, [entries]);

  const powerResults: Result[] = useMemo(() => {
    return entries.map((v) => ({
      entryId: v.id,
      rank: v.powerRank,
      status: v.powerStatus,
    }));
  }, [entries]);

  const gutResults: Result[] = useMemo(() => {
    return entries.map((v) => ({
      entryId: v.id,
      rank: v.gutRank,
      status: v.gutStatus,
    }));
  }, [entries]);

  const intelligenceResults: Result[] = useMemo(() => {
    return entries.map((v) => ({
      entryId: v.id,
      rank: v.intelligenceRank,
      status: v.intelligenceStatus,
    }));
  }, [entries]);

  return (
    <div className="u-margin">
      <div className={styles.bars}>
        <TitledField title="スピード">
          <ResultsBar results={speedResults} />
        </TitledField>
        <TitledField title="スタミナ">
          <ResultsBar results={staminaResults} />
        </TitledField>
        <TitledField title="パワー">
          <ResultsBar results={powerResults} />
        </TitledField>
        <TitledField title="根性">
          <ResultsBar results={gutResults} />
        </TitledField>
        <TitledField title="賢さ">
          <ResultsBar results={intelligenceResults} />
        </TitledField>
      </div>
    </div>
  );
};
