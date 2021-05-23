import { Link } from "react-router-dom";
import {
  OfMonth,
  ofMonths,
  Race,
  raceMonths,
  races,
  UmaClass,
  umaClasses,
} from "../../../data/Race";
import { rootPath } from "../../../misc";
import { BasicLayout } from "../basicLayout/BasicLayout";
import { raceViewPagePath } from "../raceView/RaceViewPage";

export function raceListPagePath(): string {
  return `${rootPath()}races/`;
}

export const RaceListPage: React.FC = () => {
  return (
    <BasicLayout title="レース一覧">
      <h1>レース一覧</h1>
      {umaClasses.map((umaClass) => (
        <RaceList key={umaClass} umaClass={umaClass} />
      ))}
    </BasicLayout>
  );
};

const RaceList: React.FC<{ umaClass: UmaClass }> = ({ umaClass }) => {
  return (
    <>
      <h2>{umaClass}級</h2>
      {raceMonths.map((month) =>
        ofMonths.map((ofMonth) => (
          <RaceListOfMonth
            key={ofMonth}
            month={month}
            ofMonth={ofMonth}
            umaClass={umaClass}
          />
        ))
      )}
    </>
  );
};

const RaceListOfMonth: React.FC<{
  month: number;
  ofMonth: OfMonth;
  umaClass: UmaClass;
}> = ({ month, ofMonth, umaClass }) => {
  const filteredRaces = filterRaces(races, umaClass, month, ofMonth);

  if (filteredRaces.length < 1) {
    return null;
  }

  return (
    <>
      <h3>
        {month}月{ofMonth}
      </h3>
      <ul>
        {filteredRaces.map((race) => (
          <RaceItem key={race.title} race={race} />
        ))}
      </ul>
    </>
  );
};

const RaceItem: React.FC<{ race: Race }> = ({ race }) => {
  return (
    <li className="RaceItem">
      <Link to={raceViewPagePath(race.title)}>{race.title}</Link>
    </li>
  );
};

function filterRaces(
  source: Race[],
  umaClass: UmaClass,
  month: number,
  ofMonth: OfMonth
) {
  return [...source]
    .filter(
      (v) =>
        v.umaClass === umaClass && v.month === month && v.ofMonth === ofMonth
    )
    .sort((v, u) => v.title.localeCompare(u.title));
}
