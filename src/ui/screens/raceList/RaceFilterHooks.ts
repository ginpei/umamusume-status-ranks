import { useEffect, useState } from "react";
import { printError } from "../../../misc";
import { createRaceFilter, RaceFilter, RaceFilterHandler } from "./RaceFilter";

const raceFilterStoreName = "umamusume-status-ranks--raceFilter";

export function useRaceFilterStore(): [RaceFilter, RaceFilterHandler] {
  const [filter, setFilter] = useState(loadRaceFilter() || createRaceFilter());

  useEffect(() => {
    saveRaceFilter(filter);
  }, [filter]);

  return [filter, setFilter];
}

function saveRaceFilter(filter: RaceFilter) {
  const json = JSON.stringify(filter);
  window.localStorage.setItem(raceFilterStoreName, json);
}

function loadRaceFilter() {
  const json = window.localStorage.getItem(raceFilterStoreName);
  if (!json) {
    return null;
  }

  try {
    const data = JSON.parse(json);
    const filter = createRaceFilter(data);
    return filter;
  } catch (error) {
    printError(error);
    return null;
  }
}
