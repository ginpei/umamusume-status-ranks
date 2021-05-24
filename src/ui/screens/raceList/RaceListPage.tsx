import { useEffect, useState } from "react";
import { umaClasses } from "../../../data/Race";
import { isEmptyRaceFilter, RaceFilterHandler } from "../../../data/RaceFilter";
import { useRaceFilterStore } from "../../../data/RaceFilterHooks";
import { rootPath } from "../../../misc";
import { BasicLayout } from "../basicLayout/BasicLayout";
import { RaceFilterForm } from "./RaceFilterForm";
import { RaceListByUmaClass } from "./RaceListByUmaClass";

export function raceListPagePath(): string {
  return `${rootPath()}races/`;
}

export const RaceListPage: React.FC = () => {
  const [filter, setFilter] = useRaceFilterStore();
  const [filterFormOpen, setFilterFormOpen] = useState(false);

  useEffect(() => {
    setFilterFormOpen(!isEmptyRaceFilter(filter));
  }, []);

  const onFilterChange: RaceFilterHandler = (newFilter) => {
    setFilter(newFilter);
  };

  return (
    <BasicLayout title="レース一覧">
      <h1>レース一覧</h1>
      <p>
        レース情報：
        <a
          href="https://docs.google.com/spreadsheets/d/1iNbk3SnfOGxE1NE-FYXQCK6DQ0VrAE2REVRbZ488CjY/edit#gid=360769166"
          target="_blank"
        >
          【ウマ娘】全レースカレンダー(ウマ娘目標付き) ver1.2.1 - Google Sheets
        </a>
      </p>
      <details open={filterFormOpen}>
        <summary>フィルター</summary>
        <RaceFilterForm filter={filter} onChange={onFilterChange} />
      </details>
      {umaClasses.map((umaClass) => (
        <RaceListByUmaClass
          key={umaClass}
          raceFilter={filter}
          umaClass={umaClass}
        />
      ))}
    </BasicLayout>
  );
};
