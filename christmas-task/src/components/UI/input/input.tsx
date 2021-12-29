import React, { SyntheticEvent } from "react";
import inputStyles from "./input.module.css";

interface Input {
  type: "dark" | "light";
  onChange: (e: SyntheticEvent) => void;
  placeholder: string;
  value?: string;
}
export const Input: React.FC<Input> = (props) => {
  const InputStyles = [inputStyles.Input];
  InputStyles.push(inputStyles[props.type]);

  return (
    <input
      autoFocus
      type="search"
      onChange={props.onChange}
      placeholder={props.placeholder}
      className={InputStyles.join(" ")}
      value={props.value}
    />
  );
};
