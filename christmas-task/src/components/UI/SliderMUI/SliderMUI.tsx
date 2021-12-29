import Slider from "@mui/material/Slider";
import React, { useState } from "react";
import "./sliderMUI.css";

interface SliderMUI {
  step: number;
  color: "primary" | "secondary";
  min: number;
  max: number;
  title: string;
  initialValue: Array<number>;
  onChange: (value: Array<number> | number) => void;
}

export const SliderMUI: React.FC<SliderMUI> = (props) => {
  const [value, setValue] = useState<number | number[]>(props.initialValue);
  if (value !== props.initialValue) {
    setValue(props.initialValue);
  }

  return (
    <>
      <h2>{props.title}</h2>
      <Slider
        color={props.color}
        step={props.step}
        marks
        min={props.min}
        max={props.max}
        value={value}
        valueLabelDisplay="auto"
        onChange={(e, data) => {
          setValue(data);
          props.onChange(data);
        }}
        disableSwap
      />
    </>
  );
};
