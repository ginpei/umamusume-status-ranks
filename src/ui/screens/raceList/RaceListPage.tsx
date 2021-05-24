import { useEffect, useState } from "react";
import { umaClasses } from "../../../data/Race";
import { rootPath } from "../../../misc";
import { BasicLayout } from "../basicLayout/BasicLayout";
import {
  isEmptyRaceFilter as isRaceFilterEmpty,
  RaceFilterHandler,
} from "./RaceFilter";
import { RaceFilterForm } from "./RaceFilterForm";
import { useRaceFilterStore } from "./RaceFilterHooks";
import { RaceListByUmaClass } from "./RaceListByUmaClass";

export function raceListPagePath(): string {
  return `${rootPath()}races/`;
}

export const RaceListPage: React.FC = () => {
  const [filter, setFilter] = useRaceFilterStore();
  const [filterFormOpen, setFilterFormOpen] = useState(false);

  useEffect(() => {
    setFilterFormOpen(!isRaceFilterEmpty(filter));
  }, []);

  const onFilterChange: RaceFilterHandler = (newFilter) => {
    setFilter(newFilter);
  };

  return (
    <BasicLayout title="レース一覧">
      <h1>レース一覧</h1>
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
