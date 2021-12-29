import { Slider } from "@mui/material";
import snowPowerControlStyles from "./snowPowerControl.module.css";

interface SnowPowerControl {
  setSnowflakePower: React.Dispatch<React.SetStateAction<number>>;
}
export const SnowPowerControl: React.FC<SnowPowerControl> = (props) => {
  return (
    <div>
      <h2 className={snowPowerControlStyles.snowPowerControlTitle}>
        Сила снегопада
      </h2>

      <Slider
        defaultValue={10}
        onChange={(e, data) => {
          props.setSnowflakePower(data as number);
        }}
        color="secondary"
        step={10}
        min={10}
        max={30}
      />
    </div>
  );
};
