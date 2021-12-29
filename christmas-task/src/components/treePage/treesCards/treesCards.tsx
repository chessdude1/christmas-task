import React from "react";
import { TreeSettings } from "../treePageAux";
import treesCardsStyles from "./treesCards.module.css";

interface TreesCards {
  treesNumber: number;
  setSettingsTreePage: React.Dispatch<React.SetStateAction<TreeSettings>>;
  settingsTreePage: TreeSettings;
}

export const TreesCards: React.FC<TreesCards> = (props) => {
  function generateTreesArray(trees: number) {
    const treesArr: Array<number> = [];
    for (let i = 1; i <= trees; i++) {
      treesArr.push(i);
    }
    return treesArr;
  }
  return (
    <>
      <h2 className={treesCardsStyles.treeCard__title}>Выберите елку</h2>
      <div className={treesCardsStyles.treesCardWrapper}>
        {generateTreesArray(props.treesNumber).map((number) => {
          const treeCardWrapperStyles = [treesCardsStyles.treeCardWrapper];
          if (props.settingsTreePage.treeNum === number) {
            treeCardWrapperStyles.push(
              treesCardsStyles.treeCardWrapper__active
            );
          }

          return (
            <div
              className={treeCardWrapperStyles.join(" ")}
              key={number}
              onClick={() => {
                props.setSettingsTreePage({
                  ...props.settingsTreePage,
                  treeNum: number,
                });
              }}
            >
              <img
                className={treesCardsStyles.treePicture}
                src={require(`../../../data/assets/tree/${number}.png`).default}
                alt="not found"
              ></img>
            </div>
          );
        })}
      </div>
    </>
  );
};
