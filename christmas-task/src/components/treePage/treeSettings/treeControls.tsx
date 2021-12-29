import snowFlakeImg from "../../../data/assets/svg/snowflake.svg";
import treeControlsStyles from "./treeControls.module.css";

export interface TreeControls {
  setSnowFlakeStatus: React.Dispatch<React.SetStateAction<boolean>>;
  snowFlakeStatus: boolean;
}

export const TreeControls: React.FC<TreeControls> = (props) => {
  const snowFlakeStyles = [treeControlsStyles.snowFlake];
  if (props.snowFlakeStatus) {
    snowFlakeStyles.push(treeControlsStyles.snowFlake__active);
  }
  return (
    <div className={treeControlsStyles.snowFlake__container}>
      <img
        onClick={() => {
          props.snowFlakeStatus
            ? props.setSnowFlakeStatus(false)
            : props.setSnowFlakeStatus(true);
        }}
        className={snowFlakeStyles.join(" ")}
        src={snowFlakeImg}
      ></img>
    </div>
  );
};


