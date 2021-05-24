/* eslint-disable @typescript-eslint/no-var-requires */
// 🙏 Preparation 🐴
// 1. https://docs.google.com/spreadsheets/d/1iNbk3SnfOGxE1NE-FYXQCK6DQ0VrAE2REVRbZ488CjY/edit#gid=360769166
// 2. File > Make a copy
// 3. Select and copy the main block: `Ctrl+A` and `Ctrl+C`
// 4. Paste it into `raceMaster.tsv`

const fs = require("fs");
const path = require("path");

/**
 * @typedef {import("../src/data/Race").Race} Race
 */

const INPUT_PATH = path.resolve(__dirname, "raceMaster.tsv");
const OUTPUT_PATH = path.resolve(__dirname, "../src/data/raceMaster.json");

main();

function main() {
  const tsv = readMasterData(INPUT_PATH);
  const rawRows = convertIntoArray(tsv);
  const master = createMasterData(rawRows);
  saveMasterData(OUTPUT_PATH, master);
}

/**
 * @param {string} inputPath
 */
function readMasterData(inputPath) {
  return fs.readFileSync(inputPath, "utf-8");
}

/**
 * @param {string} inputPath
 */
function convertIntoArray(tsv) {
  // the first line is a header which I don't need
  const [, ...lines] = tsv.split("\n");
  const rows = lines.map((v) => v.split("\t"));
  return rows;
}

/**
 * @param {string[][]} rows
 */
function createMasterData(rows) {
  const races = rows.map((row) => {
    const race = convertRowToRace(row);
    return race;
  });
  return races;
}

/**
 * @param {string[]} row
 * @returns {Race}
 */
function convertRowToRace(row) {
  const [
    sChecked,
    umaClass,
    sUmaClass,
    sMonth,
    ofMonthPartial,
    title,
    raceGrade,
    sDistance,
    distanceType,
    ground,
    siteName,
    direction,
    numOfFans,
    ...umaNames
  ] = row;

  return {
    direction,
    distance: Number(sDistance),
    ground,
    month: parseInt(sMonth, 10),
    ofMonth: `${ofMonthPartial}半`,
    raceGrade,
    siteName,
    title,
    umaClass,
    umaNames,
  };
}

/**
 * @param {string} outputPath
 * @param {Race[]} races
 */
function saveMasterData(outputPath, races) {
  const json = JSON.stringify(races);
  // console.log("# outputPath", outputPath);
  // console.log("# races", races);
  fs.writeFileSync(outputPath, json);
}
