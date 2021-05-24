import { Link } from "react-router-dom";
import {
  OfMonth,
  ofMonths,
  Race,
  raceMonths,
  races,
  UmaClass,
} from "../../../data/Race";
import { raceViewPagePath } from "../raceView/RaceViewPage";
import { RaceFilter } from "./RaceFilter";

export const RaceListByUmaClass: React.FC<{
  raceFilter: RaceFilter;
  umaClass: UmaClass;
}> = ({ raceFilter, umaClass }) => {
  return (
    <>
      <h2>{umaClass}級</h2>
      {raceMonths.map((month) =>
        ofMonths.map((ofMonth) => (
          <RaceListOfMonth
            key={ofMonth}
            month={month}
            ofMonth={ofMonth}
            raceFilter={raceFilter}
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
  raceFilter: RaceFilter;
  umaClass: UmaClass;
}> = ({ month, ofMonth, raceFilter, umaClass }) => {
  const filteredRaces = filterRaces(
    races,
    raceFilter,
    umaClass,
    month,
    ofMonth
  );

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
  raceFilter: RaceFilter,
  umaClass: UmaClass,
  month: number,
  ofMonth: OfMonth
) {
  return [...source]
    .filter(
      (v) =>
        v.umaClass === umaClass &&
        v.month === month &&
        v.ofMonth === ofMonth &&
        (!raceFilter.umaName || v.umaNames.includes(raceFilter.umaName))
    )
    .sort((v, u) => v.title.localeCompare(u.title));
}
