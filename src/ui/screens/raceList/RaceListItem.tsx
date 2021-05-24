import { ToggleButton } from "@react-spectrum/button";
import { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Race, raceDistanceToCategory } from "../../../data/Race";
import { raceViewPagePath } from "../raceView/RaceViewPage";
import { registerPagePathWithQuery } from "../register/RegisterPage";
import { ModerateToggleButton } from "./ModerateToggleButton";

export interface RaceListItemProps {
  isMilestone: boolean;
  race: Race;
  umaName: string;
}

export const RaceListItem: React.FC<RaceListItemProps> = ({
  isMilestone,
  race,
  umaName,
}) => {
  const [detailsOpen, setDetailsOpen] = useState(false);

  return (
    <Root>
      <LinkBox>
        <span>
          <Link to={raceViewPagePath(race.title)}>
            <RaceGrade data-grade={race.raceGrade}>{race.raceGrade}</RaceGrade>
            {race.title}
          </Link>
          <small>
            （{raceDistanceToCategory(race.distance)[0]}、{race.ground[0]}）
          </small>
          {isMilestone && <MilestoneMark>目標レース</MilestoneMark>}
        </span>
      </LinkBox>
      <ModerateToggleButton
        aria-label="詳しく"
        on={detailsOpen}
        onChange={setDetailsOpen}
      >
        …
      </ModerateToggleButton>
      {detailsOpen && (
        <DetailsFrame>
          <p>
            <DetailInlineItem>{race.siteName}</DetailInlineItem>
            <DetailInlineItem>{race.ground}</DetailInlineItem>
            <DetailInlineItem>
              {race.distance}m（{raceDistanceToCategory(race.distance)}）
            </DetailInlineItem>
            <DetailInlineItem>{race.direction}</DetailInlineItem>
          </p>
          <p>
            <Link
              to={registerPagePathWithQuery({
                raceTitle: race.title,
                umaClass: race.umaClass,
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

const LinkBox = styled.div`
  display: grid;
  place-items: center start;
`;

const RaceGrade = styled.span`
  --l-bg: #000;
  --l-fg: #fff;
  --l-font-size: 0.8em;
  background-color: var(--l-bg);
  border-radius: var(
    --spectrum-alias-border-radius-regular,
    var(--spectrum-global-dimension-size-50)
  );
  color: var(--l-fg);
  display: inline-block;
  font-size: var(--l-font-size);
  height: 1rem;
  line-height: 1rem;
  margin-right: 0.5rem;
  text-align: center;
  width: 2rem;

  &[data-grade="G1"] {
    --l-bg: blue;
  }

  &[data-grade="G2"] {
    --l-bg: fuchsia;
  }

  &[data-grade="G3"] {
    --l-bg: limegreen;
  }

  &[data-grade="OP"] {
    --l-bg: orange;
  }

  &[data-grade="Pre-OP"] {
    --l-font-size: 0.5em;
    --l-bg: orange;
  }
`;

const MilestoneMark = styled.small`
  background-color: tomato;
  border-radius: var(
    --spectrum-alias-border-radius-regular,
    var(--spectrum-global-dimension-size-50)
  );
  color: white;
  padding: 0 0.5em;
`;

const DetailsFrame = styled.div`
  grid-area: details;
`;

const DetailInlineItem = styled.span`
  margin-left: 1rem;

  &:first-child {
    margin-left: 0;
  }
`;
