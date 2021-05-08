import {
  expectationListToSymbol,
  RaceEntry,
  tadunaRankToSymbol,
} from "../../../data/RaceEntry";
import { TitledField } from "../../stable/TitledField";
import styles from "./RaceEntryList.module.scss";

export const RaceEntryList: React.FC<{ entries: RaceEntry[] }> = ({
  entries,
}) => {
  return (
    <div className={styles.root}>
      {entries.map((entry) => (
        <RaceEntryItem key={entry.id} entry={entry} />
      ))}
    </div>
  );
};

const RaceEntryItem: React.FC<{ entry: RaceEntry }> = ({ entry }) => {
  return (
    <div className={styles.RaceEntryItem}>
      <div data-area="umaName">
        <TitledField title="ウマ娘">{entry.umaName}</TitledField>
      </div>
      <div data-area="umaClass">
        <TitledField title="級">{entry.umaClass}</TitledField>
      </div>
      <div data-area="raceTitle">
        <TitledField title="レース名">{entry.raceTitle}</TitledField>
      </div>
      <div data-area="speed">
        <TitledField title="スピード">
          <div className={styles.RaceEntryItem_status}>
            {tadunaRankToSymbol(entry.speedRank)}
            <br />
            {entry.speedStatus}
          </div>
        </TitledField>
      </div>
      <div data-area="stamina">
        <TitledField title="スタミナ">
          <div className={styles.RaceEntryItem_status}>
            {tadunaRankToSymbol(entry.staminaRank)}
            <br />
            {entry.staminaStatus}
          </div>
        </TitledField>
      </div>
      <div data-area="power">
        <TitledField title="パワー">
          <div className={styles.RaceEntryItem_status}>
            {tadunaRankToSymbol(entry.powerRank)}
            <br />
            {entry.powerStatus}
          </div>
        </TitledField>
      </div>
      <div data-area="gut">
        <TitledField title="根性">
          <div className={styles.RaceEntryItem_status}>
            {tadunaRankToSymbol(entry.gutRank)}
            <br />
            {entry.gutStatus}
          </div>
        </TitledField>
      </div>
      <div data-area="intelligence">
        <TitledField title="賢さ">
          <div className={styles.RaceEntryItem_status}>
            {tadunaRankToSymbol(entry.intelligenceRank)}
            <br />
            {entry.intelligenceStatus}
          </div>
        </TitledField>
      </div>
      <div data-area="tadunaComment">
        <TitledField title="たずなさん評価">{entry.tadunaComment}</TitledField>
      </div>
      <div data-area="voteRank">
        <TitledField title="人気順位">{entry.voteRank}位</TitledField>
      </div>
      <div data-area="expectation">
        <TitledField title="予想">
          {expectationListToSymbol(entry.expectations)}
        </TitledField>
      </div>
      <div data-area="commentatorComment">
        <TitledField title="解説評価">{entry.commentatorComment}</TitledField>
      </div>
    </div>
  );
};
