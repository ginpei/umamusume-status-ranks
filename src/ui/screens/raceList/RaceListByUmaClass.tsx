import styled from "styled-components";
import {
  OfMonth,
  ofMonths,
  Race,
  raceDistanceToCategory,
  raceGrades,
  raceMonths,
  races,
  UmaClass,
} from "../../../data/Race";
import { RaceFilter } from "../../../data/RaceFilter";
import { RaceListItem } from "./RaceListItem";

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
            umaName={raceFilter.umaName}
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
  umaName: string;
}> = ({ month, ofMonth, raceFilter, umaClass, umaName }) => {
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
      <div>
        {filteredRaces.map((race) => (
          <RaceListItem key={race.title} race={race} umaName={umaName} />
        ))}
      </div>
    </>
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
  z-index: 1;
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
        (!raceFilter.umaName || v.umaNames.includes(raceFilter.umaName)) &&
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
