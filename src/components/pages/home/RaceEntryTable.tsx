import {
  expectationListToSymbol,
  RaceEntry,
  tadunaRankToSymbol,
} from "../../../data/RaceEntry";

export const RaceEntryTable: React.FC<{ entries: RaceEntry[] }> = ({
  entries,
}) => {
  return (
    <table className="RaceEntryTable">
      <thead>
        <tr>
          <th>レース名</th>
          <th>スピード</th>
          <th>スタミナ</th>
          <th>パワー</th>
          <th>根性</th>
          <th>賢さ</th>
          <th>たづな評</th>
          <th>人気</th>
          <th>予想</th>
          <th>解説評価</th>
        </tr>
      </thead>
      <tbody>
        {entries.map((entry) => (
          <RaceEntryRow key={entry.id} entry={entry} />
        ))}
      </tbody>
    </table>
  );
};

const RaceEntryRow: React.FC<{ entry: RaceEntry }> = ({ entry }) => {
  return (
    <tr className="RaceEntryRow">
      <td>{entry.raceTitle}</td>
      <td>
        {entry.speedStatus} {tadunaRankToSymbol(entry.speedRank)}
      </td>
      <td>
        {entry.staminaStatus} {tadunaRankToSymbol(entry.staminaRank)}
      </td>
      <td>
        {entry.powerStatus} {tadunaRankToSymbol(entry.powerRank)}
      </td>
      <td>
        {entry.gutStatus} {tadunaRankToSymbol(entry.gutRank)}
      </td>
      <td>
        {entry.intelligenceStatus} {tadunaRankToSymbol(entry.intelligenceRank)}
      </td>
      <td>{entry.tadunaComment}</td>
      <td>{entry.voteRank}</td>
      <td>{expectationListToSymbol(entry.expectations)}</td>
      <td>{entry.commentatorComment}</td>
    </tr>
  );
};
