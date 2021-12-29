import { useEffect, useState } from "react";
import { Toys } from "../../App";
import TreePage from "./treePage";

interface treePageAux {
  toys: Array<Toys>;
  snowflakePower: number;
}

export interface TreeSettings {
  treeNum: number;
  backgroundNum: number;
  garlandName: string;
}

export const TreePageAux: React.FC<treePageAux> = (props) => {
  const initialToys = [
    {
      num: "0",
      name: "Большой шар с рисунком",
      count: "0",
      year: "1960",
      shape: "шар",
      color: "желтый",
      size: "большой",
      favorite: false,
    },
  ];
  const initialSettings: TreeSettings = {
    treeNum: 1,
    backgroundNum: 1,
    garlandName: "",
  };

  const [toysForTree, setToysForTree] = useState<Array<Toys>>(initialToys);
  const [settingsTreePage, setSettingsTreePage] = useState(initialSettings);
  const [snowFlakeStatus, setSnowFlakeStatus] = useState(false);

  window.addEventListener("beforeunload", setLocalStorageTreePage);
  window.addEventListener("load", getLocalStorageSettingsTreePage);

  function getLocalStorageSettingsTreePage() {
    const treeNum = JSON.parse(
      localStorage.getItem("treeSettings__treeNum") as string
    );
    const garlandName = JSON.parse(
      localStorage.getItem("treeSettings__garlandName") as string
    );
    const backgroundNum = JSON.parse(
      localStorage.getItem("treeSettings__backgroundNum") as string
    );

    setSettingsTreePage({
      treeNum: Number(treeNum),
      backgroundNum: Number(backgroundNum),
      garlandName,
    });
  }

  function setLocalStorageTreePage() {
    localStorage.setItem(
      "treeSettings__treeNum",
      JSON.stringify(settingsTreePage.treeNum)
    );
    localStorage.setItem(
      "treeSettings__garlandName",
      JSON.stringify(settingsTreePage.garlandName)
    );
    localStorage.setItem(
      "treeSettings__backgroundNum",
      JSON.stringify(settingsTreePage.backgroundNum)
    );
  }

  useEffect(() => {
    const numberOffFavoriteToys = props.toys.filter(
      (toy) => toy.favorite === true
    );
    setToysForTree(props.toys.filter((toy) => toy.favorite === true));
    if (numberOffFavoriteToys.length < 1) {
      setToysForTree(props.toys.filter((toy) => Number(toy.num) <= 20));
    }
  }, []);

  return (
    <TreePage
      snowflakePower={props.snowflakePower}
      settingsTreePage={settingsTreePage}
      setSettingsTreePage={setSettingsTreePage}
      toysForTree={toysForTree}
      setToysForTree={setToysForTree}
      snowFlakeStatus={snowFlakeStatus}
      setSnowFlakeStatus={setSnowFlakeStatus}
    />
  );
};
