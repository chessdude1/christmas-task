import React, { useState } from "react";
import "./App.css";
import { Footer } from "./components/footer/footer";
import { Header } from "./components/header/header";
import { Navigation } from "./components/navigation/navigation";
import { SettingsModal } from "./components/settingsModal/settingsModal";
import dataAsync from "./data/dataAsync.json";

export interface Toys {
  num: string;
  name: string;
  count: string;
  year: string;
  shape: string;
  color: string;
  size: string;
  favorite: boolean;
}

export interface newYearSong {
  song: HTMLAudioElement;
  volume: number;
}

function App() {
  const [toys, setToys] = useState<Toys[]>(
    JSON.parse(JSON.stringify(dataAsync))
  );
  const [modalWindowStatus, setModalWindowStatus] = useState<boolean>(false);
  const [snowflakePower, setSnowflakePower] = useState<number>(10);
  const [newYearSong, setNewYearSongSettings] = useState<newYearSong>({
    song: new Audio(require("./data/assets/audio/audio.mp3").default),
    volume: 0.1,
  });

  return (
    <div className="App">
      <SettingsModal
        newYearSong={newYearSong}
        setNewYearSongSettings={setNewYearSongSettings}
        setSnowflakePower={setSnowflakePower}
        modalWindowStatus={modalWindowStatus}
        setModalWindowStatus={setModalWindowStatus}
        snowflakePower={snowflakePower}
      />
      <Header setModalWindowStatus={setModalWindowStatus} />
      <Navigation
        snowflakePower={snowflakePower}
        setToys={setToys}
        toys={toys}
      />
      <Footer />
    </div>
  );
}

export default App;
