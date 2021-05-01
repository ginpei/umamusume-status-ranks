import { TadunaRank, tadunaRankToSymbol } from "../../../data/RaceEntry";
import styles from "./ResultsBar.module.scss";

// TODO find proper name
export interface Result {
  entryId: string;
  rank: TadunaRank;
  status: number;
}

export const ResultsBar: React.FC<{ results: Result[] }> = ({ results }) => {
  return (
    <div className={styles.root}>
      <div className={styles.bar}>
        <div className={styles.innerBar} data-level="S">
          SS+
        </div>
        <div className={styles.innerBar} data-level="S">
          SS
        </div>
        <div className={styles.innerBar} data-level="S">
          S+
        </div>
        <div className={styles.innerBar} data-level="S">
          S
        </div>
        <div className={styles.innerBar} data-level="A">
          A+
        </div>
        <div className={styles.innerBar} data-level="A">
          A
        </div>
        <div className={styles.innerBar} data-level="B">
          B+
        </div>
        <div className={styles.innerBar} data-level="B">
          B
        </div>
        <div className={styles.innerBar} data-level="C">
          C+
        </div>
        <div className={styles.innerBar} data-level="C">
          C
        </div>
        <div className={styles.innerBar} data-level="D">
          D+
        </div>
        <div className={styles.innerBar} data-level="D">
          D
        </div>
        <div className={styles.innerBar} data-level="E">
          E+
        </div>
        <div className={styles.innerBar} data-level="E">
          E
        </div>
        <div className={styles.innerBar} data-level="F">
          F+
        </div>
        <div className={styles.innerBar} data-level="F">
          F
        </div>
        <div className={styles.innerBar} data-level="G">
          G+
        </div>
        <div className={styles.innerBar} data-level="G">
          G
        </div>
      </div>
      {results.map((result) => (
        <Mark key={result.entryId} result={result} />
      ))}
    </div>
  );
};

const Mark: React.FC<{ result: Result }> = ({ result }) => {
  const bottom = result.status / 2;

  return (
    <span
      className={styles.mark}
      key={result.entryId}
      style={{ bottom: `${bottom}px` }}
    >
      {tadunaRankToSymbol(result.rank)}
    </span>
  );
};
