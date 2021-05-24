import { Checkbox } from "@react-spectrum/checkbox";
import { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import {
  raceDistanceCategories,
  RaceDistanceCategory,
  RaceGround,
  raceGrounds,
  umaNames,
} from "../../../data/Race";
import { RaceFilter, RaceFilterHandler } from "../../../data/RaceFilter";
import { TextField } from "../../../vendor/TextField";

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

  const onInputChange = (newName: string) => {
    setName(newName);
  };

  useEffect(() => {
    if (name === "" || umaNames.includes(name)) {
      onChange({ ...filter, umaName: name });
    }
  }, [name]);

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

  return (
    <form className="RaceFilterForm">
      <div className="u-margin">
        <TextField
          label="ウマ娘"
          list={umaNameId}
          onChange={onInputChange}
          type="search"
          value={name}
          width="100%"
        />
        <datalist id={umaNameId}>
          {umaNames.map((umaName) => (
            <option key={umaName}>{umaName}</option>
          ))}
        </datalist>
      </div>
      <div className="u-margin">
        <div>
          <LabelText>距離</LabelText>
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
          <LabelText>バ場</LabelText>
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
    </form>
  );
};

const LabelText = styled.span`
  color: var(
    --spectrum-alias-label-text-color,
    var(--spectrum-global-color-gray-700)
  );
  font-size: var(--spectrum-global-dimension-font-size-75);
  -webkit-font-smoothing: subpixel-antialiased;
  -moz-osx-font-smoothing: auto;
  font-smooth: subpixel-antialiased;
  font-weight: var(--spectrum-global-font-weight-regular, 400);
`;
