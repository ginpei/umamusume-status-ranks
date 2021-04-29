import { useEffect, useState } from "react";
import { Firestore } from "../gp-firebase/firebase";
import { RaceEntry } from "./RaceEntry";
import { getRaceEntryCollection, ssToRaceEntry } from "./RaceEntryDb";

export function useRaceEntriesByTitle(
  db: Firestore,
  title: string
): RaceEntry[] | null {
  const [entries, setEntries] = useState<RaceEntry[] | null>(null);

  useEffect(() => {
    const coll = getRaceEntryCollection(db);
    const query = coll.where("raceTitle", "==", title).orderBy("createdAt");
    return query.onSnapshot((ss) => {
      const newEntries = ss.docs.map((v) => ssToRaceEntry(v));
      setEntries(newEntries);
    });
  }, [db, title]);

  return entries;
}
