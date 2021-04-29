import {
  CollectionReference,
  DocumentData,
  DocumentReference,
  Firestore,
} from "../gp-firebase/firebase";
import { RaceEntry } from "./RaceEntry";

export function raceEntryToDataRecord(entry: RaceEntry): DocumentData {
  return { ...entry };
}

export function getRaceEntryCollection(db: Firestore): CollectionReference {
  return db.collection("raceEntries");
}

export function getRaceEntryDoc(db: Firestore, id: string): DocumentReference {
  return getRaceEntryCollection(db).doc(id);
}

export async function saveRaceEntry(
  db: Firestore,
  entry: RaceEntry
): Promise<DocumentReference> {
  const coll = getRaceEntryCollection(db);
  const data = raceEntryToDataRecord(entry);
  return coll.add(data);
}
