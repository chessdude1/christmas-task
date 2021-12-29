import React from "react";
import garlandStyles from "./choiceGarlandStyles.module.css";
import { TreeSettings } from "../treePageAux";
import Button from "../../UI/button/button";

export interface ChoiceGarland {
  settingsTreePage: TreeSettings;
  setSettingsTreePage: React.Dispatch<React.SetStateAction<TreeSettings>>;
}

export const ChoiceGarland: React.FC<ChoiceGarland> = (props) => {
  const colors = ["green", "red", "blue", "yellow", "multi"];
  return (
    <>
      <h2>Гирлянда</h2>
      <div className={garlandStyles.choice__container}>
        <div className={garlandStyles.choice__wrapper}>
          {colors.map((color) => {
            const garlandBtnStyles = [
              garlandStyles[`choice__${color}`],
              garlandStyles.choice,
            ];
            if (props.settingsTreePage.garlandName === color) {
              garlandBtnStyles.push(garlandStyles.choice_active);
            }
            return (
              <div
                key={color}
                onClick={() => {
                  props.setSettingsTreePage({
                    ...props.settingsTreePage,
                    garlandName: color,
                  });
                }}
                className={garlandBtnStyles.join(" ")}
              ></div>
            );
          })}
        </div>
        <div className={garlandStyles.choice__controls}>
          <Button
            type="small"
            onClick={() => {
              props.setSettingsTreePage({
                ...props.settingsTreePage,
                garlandName: "",
              });
            }}
          >
            Отключить гирлянду
          </Button>
        </div>
      </div>
    </>
  );
};
