import React from "react";
import { TreesCards } from "./treesCards/treesCards";
import treePageStyles from "./treePage.module.css";
import { ChoiceBackground } from "./choiceBackground/choiceBackground";
import { ChoiceGarland } from "./choiceGarland/choiceGarland";
import Button from "../UI/button/button";
import { Canvas } from "./canvas/canvas";
import { FavoriteToysList } from "./favoriteToysList/favoriteToysList";
import { Toys } from "../../App";
import { Link } from "react-router-dom";
import { TreeSettings } from "./treePageAux";
import { TreeControls } from "./treeSettings/treeControls";

interface TreePage {
  toysForTree: Array<Toys>;
  setSettingsTreePage: React.Dispatch<React.SetStateAction<TreeSettings>>;
  settingsTreePage: TreeSettings;
  setToysForTree: React.Dispatch<React.SetStateAction<Array<Toys>>>;
  setSnowFlakeStatus: React.Dispatch<React.SetStateAction<boolean>>;
  snowFlakeStatus: boolean;
  snowflakePower: number;
}

const TREESNUMBER = 6;
const BACKROUNDSNUMBER = 8;

export const TreePage: React.FC<TreePage> = (props) => {
  return (
    <main className={treePageStyles.treePageWrapper}>
      <section className={treePageStyles.leftBar}>
        <TreeControls
          snowFlakeStatus={props.snowFlakeStatus}
          setSnowFlakeStatus={props.setSnowFlakeStatus}
        />
        <TreesCards
          setSettingsTreePage={props.setSettingsTreePage}
          settingsTreePage={props.settingsTreePage}
          treesNumber={TREESNUMBER}
        />
        <ChoiceBackground
          setSettingsTreePage={props.setSettingsTreePage}
          settingsTreePage={props.settingsTreePage}
          backgroundsNumber={BACKROUNDSNUMBER}
        />
        <ChoiceGarland
          settingsTreePage={props.settingsTreePage}
          setSettingsTreePage={props.setSettingsTreePage}
        />
        <div className={treePageStyles.leftBar__settings}>
          <Button
            type="small"
            onClick={() => {
              localStorage.clear();
            }}
          >
            Очистить настройки
          </Button>
          <Button
            type="small"
            onClick={() => {
              ("");
            }}
          >
            <Link className={treePageStyles.link__toChoice} to="/choice">
              Выбрать игрушки
            </Link>
          </Button>
        </div>
      </section>
      <section className={treePageStyles.canvas}></section>
      <Canvas
        snowflakePower={props.snowflakePower}
        settingsTreePage={props.settingsTreePage}
        snowFlakeStatus={props.snowFlakeStatus}
      />
      <section className="rightBar">
        <FavoriteToysList
          setToysForTree={props.setToysForTree}
          toys={props.toysForTree}
        />
      </section>
    </main>
  );
};

export default TreePage;
