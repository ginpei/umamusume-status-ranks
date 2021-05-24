import { ToggleButton } from "@react-spectrum/button";
import { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Race } from "../../../data/Race";
import { raceViewPagePath } from "../raceView/RaceViewPage";
import { registerPagePathWithQuery } from "../register/RegisterPage";

export interface RaceListItemProps {
  race: Race;
  umaName: string;
}

export const RaceListItem: React.FC<RaceListItemProps> = ({
  race,
  umaName,
}) => {
  const [detailsOpen, setDetailsOpen] = useState(false);

  return (
    <Root>
      <div>
        <Link to={raceViewPagePath(race.title)}>{race.title}</Link>
      </div>
      <ToggleButton
        aria-label="詳しく"
        isSelected={detailsOpen}
        onChange={setDetailsOpen}
      >
        …
      </ToggleButton>
      {detailsOpen && (
        <DetailsFrame>
          <p>
            {race.siteName}競馬場・{race.distance}m・{race.direction}
          </p>
          <p>
            <Link
              to={registerPagePathWithQuery({
                raceTitle: race.title,
                umaGrade: race.umaClass,
                umaName,
              })}
            >
              出走記録を追加
            </Link>
          </p>
        </DetailsFrame>
      )}
    </Root>
  );
};

const Root = styled.div`
  border-color: var(
    --spectrum-alias-border-color,
    var(--spectrum-global-color-gray-400)
  );
  border-style: none none solid;
  border-width: 1px 0;
  display: grid;
  grid-template:
    "link    toggle"
    "details details"
    / auto 3rem;
  margin-top: -1px;
  margin-left: -1rem;
  margin-right: -1rem;
  padding: 1rem;

  &:first-child {
    border-top-style: solid;
  }
`;

const DetailsFrame = styled.div`
  grid-area: details;
`;
