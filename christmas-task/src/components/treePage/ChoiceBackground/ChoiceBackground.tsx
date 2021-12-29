import { TreeSettings } from "../treePageAux";
import ChoiceBackgroundStyles from "./choiceBackground.module.css";

interface ChoiceBackground {
  backgroundsNumber: number;
  setSettingsTreePage: React.Dispatch<React.SetStateAction<TreeSettings>>;
  settingsTreePage: TreeSettings;
}

export const ChoiceBackground: React.FC<ChoiceBackground> = (props) => {
  function generateBackgroundArray(backgrounds: number) {
    const backgroundArray: Array<number> = [];
    for (let i = 1; i <= backgrounds; i++) {
      backgroundArray.push(i);
    }
    return backgroundArray;
  }
  return (
    <>
      <h2>Выберите фон</h2>
      <div className={ChoiceBackgroundStyles.ChoiceBackgroundList__wrapper}>
        {generateBackgroundArray(props.backgroundsNumber).map((background) => {
          const ChoiceBackground__wrapperStyles = [
            ChoiceBackgroundStyles.ChoiceBackground__wrapper,
          ];
          if (props.settingsTreePage.backgroundNum === background) {
            ChoiceBackground__wrapperStyles.push(
              ChoiceBackgroundStyles.ChoiceBackground__wrapperActive
            );
          }
          return (
            <div
              onClick={() => {
                props.setSettingsTreePage({
                  ...props.settingsTreePage,
                  backgroundNum: background,
                });
              }}
              className={ChoiceBackground__wrapperStyles.join(" ")}
              key={background}
            >
              <img
                className={ChoiceBackgroundStyles.ChoiceBackground_Img}
                src={
                  require(`../../../data/assets/bg/${background}.jpg`).default
                }
                alt="not found"
              ></img>
            </div>
          );
        })}
      </div>
    </>
  );
};
