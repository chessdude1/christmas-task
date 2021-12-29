import React, { SyntheticEvent } from "react";
import selectStyles from "./select.module.css";

interface option {
  value: string | number;
  text: string;
}

interface Select {
  theme: "dark" | "light";
  label: string;
  options: Array<option>;
  onChange: (e: SyntheticEvent) => void;
}

export const Select: React.FC<Select> = (props) => {
  const SelectStyles = [selectStyles.select];
  if (props.theme === "dark") {
    SelectStyles.push(selectStyles.dark);
  } else if (props.theme === "light") {
    SelectStyles.push(selectStyles.light);
  }
  const htmlFor = `${props.label}-${Math.random()}`;
  return (
    <>
      <h2>
        <label htmlFor={htmlFor}>{props.label}</label>
      </h2>
      <select
        className={SelectStyles.join(" ")}
        id={htmlFor}
        onChange={props.onChange}
      >
        {props.options.map((option, index) => {
          return (
            <option value={option.value} key={String(option.value) + index}>
              {option.text}
            </option>
          );
        })}
      </select>
    </>
  );
};
