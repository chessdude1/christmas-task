import { Slider } from "@mui/material";
import { useState } from "react";
import audioIcon from "../../../data/assets/svg/audio.svg";
import audioMuteIcon from "../../../data/assets/svg/mute.svg";
import musicControlStyles from "./musicControl.module.css";
import { newYearSong } from "../../../App";

interface MusicControl {
  newYearSong: newYearSong;
  setNewYearSongSettings: React.Dispatch<React.SetStateAction<newYearSong>>;
}

export const MusicControl: React.FC<MusicControl> = (props) => {
  const [isAudioPlay, setAudioPlay] = useState<boolean>(false);

  if (isAudioPlay && props.newYearSong) {
    props.newYearSong.song.play();
  } else if (!isAudioPlay && props.newYearSong) {
    props.newYearSong.song.pause();
  }

  window.addEventListener("beforeunload", setLocalStorageMusicSettings);
  window.addEventListener("load", getLocalStorageMusicSettings);

  const playMusic = () => {
    props.newYearSong.song.play();
    document.removeEventListener("click", playMusic);
  };

  function getLocalStorageMusicSettings() {
    const isMusicPlay = Boolean(
      JSON.parse(localStorage.getItem("musicSettings") as string)
    );
    const newYearSongVolume = JSON.parse(
      localStorage.getItem("newYearSongVolume") as string
    );
    if (isMusicPlay) {
      document.addEventListener("click", playMusic);
    }

    setAudioPlay(isMusicPlay);
    props.setNewYearSongSettings({
      ...props.newYearSong,
      volume: newYearSongVolume,
    });
  }

  function setLocalStorageMusicSettings() {
    localStorage.setItem("musicSettings", JSON.stringify(isAudioPlay));
    localStorage.setItem(
      "newYearSongVolume",
      JSON.stringify(props.newYearSong.volume)
    );
  }

  return (
    <div>
      {isAudioPlay && props.newYearSong.volume > 0 ? (
        <img
          onClick={() => {
            isAudioPlay ? setAudioPlay(false) : setAudioPlay(true);
          }}
          src={audioIcon}
        ></img>
      ) : (
        <img
          className={musicControlStyles.volumeIcon}
          onClick={() => {
            isAudioPlay ? setAudioPlay(false) : setAudioPlay(true);
          }}
          src={audioMuteIcon}
        ></img>
      )}
      <div>
        <h2 className={musicControlStyles.volumeTitle}>Громкость</h2>
        <Slider
          defaultValue={10}
          color="secondary"
          valueLabelDisplay="auto"
          step={10}
          min={0}
          max={100}
          onChange={(e, data) => {
            props.setNewYearSongSettings({
              ...props.newYearSong,
              volume: (data as number) * 0.01,
            });
          }}
        />
      </div>
    </div>
  );
};
