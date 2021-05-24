import { useEffect, useMemo, useState } from "react";
import { umaNames } from "../../../data/Race";
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

  return (
    <form className="RaceFilterForm">
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
    </form>
  );
};
