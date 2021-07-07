/* eslint-disable import/no-extraneous-dependencies */
import { ActionButton, Button } from "@react-spectrum/button";
import { ButtonGroup } from "@react-spectrum/buttongroup";
import { Dialog, DialogTrigger } from "@react-spectrum/dialog";
import { Content } from "@react-spectrum/view";
import { useEffect, useState } from "react";

import { Link } from "react-router-dom";
import styled from "styled-components";
import { useCurrentUser } from "../../../data/CurrentUserContext";
import { Race, raceDistanceToCategory } from "../../../data/Race";
import { createRaceEntry, RaceEntryCallback } from "../../../data/RaceEntry";
import { saveRaceEntry } from "../../../data/RaceEntryDb";
import { db } from "../../../gp-firebase/firebase";
import { getErrorMessage } from "../../../misc";
import { RaceEntryForm } from "../home/RaceEntryForm";
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
          <p>
            <RegisterButton umaName={umaName} raceTitle={race.title} />
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

const RegisterButton: React.FC<{ umaName: string; raceTitle: string }> = ({
  umaName,
  raceTitle,
}) => {
  const user = useCurrentUser();
  const [entry, setEntry] = useState(createRaceEntry({ umaName, raceTitle }));
  const [errorMessage, setErrorMessage] = useState("");
  const [working, setWorking] = useState(false);

  useEffect(() => {
    if (!errorMessage) {
      return;
    }

    // eslint-disable-next-line no-alert
    window.alert(errorMessage);
    setErrorMessage("");
  }, [errorMessage]);

  const onNewFormChange: RaceEntryCallback = (newEntry) => {
    setEntry(newEntry);
  };

  const onNewFormSubmit = async () => {
    try {
      setWorking(true);

      await saveRaceEntry(db, { ...entry, userId: user.id });

      setEntry(
        createRaceEntry({
          spGolshiChanMode2021: entry.spGolshiChanMode2021,
          umaClass: entry.umaClass,
          umaName: entry.umaName,
        })
      );
    } catch (error) {
      setErrorMessage(getErrorMessage(error));
    } finally {
      setWorking(false);
    }
  };

  return (
    <DialogTrigger>
      <ActionButton>出走記録を追加</ActionButton>
      {(close) => (
        <Dialog>
          <Content>
            <DialogRaceEntryFormStyleProvider>
              <RaceEntryForm
                disabled={working}
                entry={entry}
                onChange={onNewFormChange}
                onSubmit={onNewFormSubmit}
                submitLabel={""}
              />
            </DialogRaceEntryFormStyleProvider>
          </Content>
          <ButtonGroup>
            <Button variant="secondary" onPress={close}>
              Cancel
            </Button>
            <Button variant="cta" onPress={onNewFormSubmit}>
              Confirm
            </Button>
          </ButtonGroup>
        </Dialog>
      )}
    </DialogTrigger>
  );
};

const DialogRaceEntryFormStyleProvider = styled.div`
  // overwrite to shrink inputs
  // (they don't have own named vars)
  --spectrum-global-dimension-size-150: min(3vw, 15px); // padding
  --spectrum-global-dimension-size-600: min(1vw, 48px); // min-width

  // overwrite to keep text one line
  --spectrum-global-dimension-font-size-75: 3vw;
`;
