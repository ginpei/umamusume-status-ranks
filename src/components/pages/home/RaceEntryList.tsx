import {
  expectationListToSymbol,
  RaceEntry,
  tadunaRankToSymbol,
} from "../../../data/RaceEntry";
import { InputBlock } from "../../stable/InputField";
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
      <div data-area="raceTitle">
        <InputBlock title="レース名">{entry.raceTitle}</InputBlock>
      </div>
      <div data-area="speed">
        <InputBlock title="スピード">
          {tadunaRankToSymbol(entry.speedRank)}
          <br />
          {entry.speedStatus}
        </InputBlock>
      </div>
      <div data-area="stamina">
        <InputBlock title="スタミナ">
          {tadunaRankToSymbol(entry.staminaRank)}
          <br />
          {entry.staminaStatus}
        </InputBlock>
      </div>
      <div data-area="power">
        <InputBlock title="パワー">
          {tadunaRankToSymbol(entry.powerRank)}
          <br />
          {entry.powerStatus}
        </InputBlock>
      </div>
      <div data-area="gut">
        <InputBlock title="根性">
          {tadunaRankToSymbol(entry.gutRank)}
          <br />
          {entry.gutStatus}
        </InputBlock>
      </div>
      <div data-area="intelligence">
        <InputBlock title="賢さ">
          {tadunaRankToSymbol(entry.intelligenceRank)}
          <br />
          {entry.intelligenceStatus}
        </InputBlock>
      </div>
      <div data-area="tadunaComment">
        <InputBlock title="たずなさん評価">{entry.tadunaComment}</InputBlock>
      </div>
      <div data-area="voteRank">
        <InputBlock title="人気順位">{entry.voteRank}位</InputBlock>
      </div>
      <div data-area="expectation">
        <InputBlock title="予想">
          {expectationListToSymbol(entry.expectations)}
        </InputBlock>
      </div>
      <div data-area="commentatorComment">
        <InputBlock title="解説評価">{entry.commentatorComment}</InputBlock>
      </div>
    </div>
  );
};
