import { Link } from "react-router-dom";
import styled from "styled-components";
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
    <ListSection>
      <ListHeading>{umaClass}級</ListHeading>
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
    </ListSection>
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

const ListSection = styled.section`
  position: relative;
`;

const ListHeading = styled.h2`
  background-color: var(--spectrum-global-color-gray-50);
  margin-left: -1rem;
  margin-right: -1rem;
  padding-left: 1rem;
  padding-right: 1rem;
  position: sticky;
  top: 0;
`;

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
