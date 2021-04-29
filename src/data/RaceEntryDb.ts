import {
  CollectionReference,
  DocumentData,
  DocumentReference,
  DocumentSnapshot,
  Firestore,
} from "../gp-firebase/firebase";
import { createRaceEntry, RaceEntry } from "./RaceEntry";

export function raceEntryToDataRecord(entry: RaceEntry): DocumentData {
  return { ...entry };
}

export function getRaceEntryCollection(db: Firestore): CollectionReference {
  return db.collection("raceEntries");
}

export function getRaceEntryDoc(db: Firestore, id: string): DocumentReference {
  return getRaceEntryCollection(db).doc(id);
}

export function ssToRaceEntry(ss: DocumentSnapshot): RaceEntry {
  const data = ss.data();
  if (!data) {
    throw new Error("?");
  }

  return createRaceEntry(data);
}

export async function saveRaceEntry(
  db: Firestore,
  entry: RaceEntry
): Promise<DocumentReference> {
  const coll = getRaceEntryCollection(db);
  const data = raceEntryToDataRecord(entry);
  return coll.add(data);
}
