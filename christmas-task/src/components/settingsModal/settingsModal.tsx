import { SnackBarMUI } from "../UX/snackBarMUI/snackBarMUI";
import { MusicControl } from "./musicControl/musicControl";
import settingsModalStyles from "./settingsModal.module.css";
import { SnowPowerControl } from "./snowPowerControl/snowPowerControl";
import {newYearSong} from '../../App'


interface SettingsModal {
  snowflakePower: number;
  modalWindowStatus: boolean;
  setModalWindowStatus: React.Dispatch<React.SetStateAction<boolean>>;
  setSnowflakePower: React.Dispatch<React.SetStateAction<number>>;
  newYearSong: newYearSong;
  setNewYearSongSettings: React.Dispatch<React.SetStateAction<newYearSong>>;
}



export const SettingsModal: React.FC<SettingsModal> = (props) => {
  const modalWrapperStyles = [settingsModalStyles.modalWrapper];
  if (props.modalWindowStatus) {
    modalWrapperStyles.push(settingsModalStyles.active);
  }
  return (
    <div
      onClick={() => {
        props.setModalWindowStatus(false);
      }}
      className={modalWrapperStyles.join(" ")}
    >
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className={
          props.modalWindowStatus ? settingsModalStyles.modalContent : ""
        }
      >
        {props.snowflakePower === 30 ? (
          <SnackBarMUI message="Может привести к проблемам с производительностью" />
        ) : (
          ""
        )}
        <MusicControl newYearSong={props.newYearSong}  setNewYearSongSettings={props.setNewYearSongSettings} />
        <SnowPowerControl setSnowflakePower={props.setSnowflakePower} />
      </div>
    </div>
  );
};
