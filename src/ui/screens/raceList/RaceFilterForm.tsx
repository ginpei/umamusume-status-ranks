import { Checkbox } from "@react-spectrum/checkbox";
import { useEffect, useMemo, useState } from "react";
import {
  raceDistanceCategories,
  RaceDistanceCategory,
  RaceGrade,
  raceGrades,
  RaceGround,
  raceGrounds,
  umaNames,
} from "../../../data/Race";
import { RaceFilter, RaceFilterHandler } from "../../../data/RaceFilter";
import { TextField } from "../../../vendor/TextField";
import { LabelText } from "../../stable/LabelText";

export interface RaceFilterFormProps {
  filter: RaceFilter;
  onChange: RaceFilterHandler;
}

export const RaceFilterForm: React.FC<RaceFilterFormProps> = ({
  filter,
  onChange,
}) => {
  const [name, setName] = useState(filter.umaName);

  const umaNameId = useMemo(() => Math.random().toFixed(32).slice(2), []);

  useEffect(() => {
    if (name === "" || umaNames.includes(name)) {
      onChange({ ...filter, umaName: name });
    }
  }, [name]);

  const onUmaNameChange = (newName: string) => {
    setName(newName);
  };

  const onMilestonesEmphasizedChange = (checked: boolean) => {
    onChange({ ...filter, milestonesEmphasized: checked });
  };

  const onDistanceChange = (
    distance: RaceDistanceCategory,
    checked: boolean
  ) => {
    const set = new Set([...filter.distanceCategories]);
    if (checked) {
      set.add(distance);
    } else {
      set.delete(distance);
    }

    const distanceCategories = Array.from(set);
    onChange({ ...filter, distanceCategories });
  };

  const onGroundChange = (ground: RaceGround, checked: boolean) => {
    const set = new Set([...filter.grounds]);
    if (checked) {
      set.add(ground);
    } else {
      set.delete(ground);
    }

    const grounds = Array.from(set);
    onChange({ ...filter, grounds });
  };

  const onGradeChange = (grade: RaceGrade, checked: boolean) => {
    const set = new Set([...filter.grades]);
    if (checked) {
      set.add(grade);
    } else {
      set.delete(grade);
    }

    const grades = Array.from(set);
    onChange({ ...filter, grades });
  };

  return (
    <form className="RaceFilterForm">
      <div className="u-margin">
        <TextField
          label="??????????????????????????????"
          list={umaNameId}
          onChange={onUmaNameChange}
          type="search"
          value={name}
          width="100%"
        />
        <datalist id={umaNameId}>
          {umaNames.map((umaName) => (
            <option key={umaName}>{umaName}</option>
          ))}
        </datalist>
        <Checkbox
          isSelected={filter.milestonesEmphasized}
          onChange={onMilestonesEmphasizedChange}
        >
          ????????????????????????????????????
        </Checkbox>
      </div>
      <div className="u-margin">
        <div>
          <LabelText>??????</LabelText>
        </div>
        {raceDistanceCategories.map((distance) => (
          <Checkbox
            isSelected={filter.distanceCategories.includes(distance)}
            key={distance}
            onChange={(v) => onDistanceChange(distance, v)}
            value={distance}
          >
            {distance}
          </Checkbox>
        ))}
      </div>
      <div className="u-margin">
        <div>
          <LabelText>??????</LabelText>
        </div>
        {raceGrounds.map((ground) => (
          <Checkbox
            isSelected={filter.grounds.includes(ground)}
            key={ground}
            onChange={(v) => onGroundChange(ground, v)}
            value={ground}
          >
            {ground}
          </Checkbox>
        ))}
      </div>
      <div className="u-margin">
        <div>
          <LabelText>????????????</LabelText>
        </div>
        {raceGrades.map((grade) => (
          <Checkbox
            isSelected={filter.grades.includes(grade)}
            key={grade}
            onChange={(v) => onGradeChange(grade, v)}
            value={grade}
          >
            {grade}
          </Checkbox>
        ))}
      </div>
    </form>
  );
};
