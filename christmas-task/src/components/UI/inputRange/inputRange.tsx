import React, { SyntheticEvent, useRef } from "react";
import InputStyles from "./inputRange.module.css";

interface InputRange {
  label: string;
  max: number;
  min: number;
  onChange: (e: SyntheticEvent) => void;
}

export const InputRange: React.FC<InputRange> = (props) => {
  const textInput = useRef<HTMLInputElement>(null);
  return (
    <div className={InputStyles.inputWrapper}>
      <p>{props.min}</p>
      <input
        className={InputStyles.inputBody}
        min={props.min}
        max={props.max}
        onChange={props.onChange}
        type="range"
        ref={textInput}
      />
      <p>{props.max}</p>
    </div>
  );
};
