import { Checkbox } from "../../UI/checkbox/checkbox";
import choiceColorStyle from "./choiceColor.module.css";

interface ChoiceColor {
  onClick: (color: string) => void;
  color: Array<string>;
}

const COLORS = ["белый", "желтый", "красный", "синий", "зелёный"];

export const ChoiceColor: React.FC<ChoiceColor> = (props) => {
  return (
    <>
      <h2>Цвет</h2>
      <div className={choiceColorStyle.choiceColorWrapper}>
        {COLORS.map((color) => {
          return (
            <div key={color} className={choiceColorStyle.choiceColor}>
              <Checkbox
                onClick={() => {
                  props.onClick(color);
                }}
                color={color}
                isActive={props.color.includes(color)}
              />
            </div>
          );
        })}
      </div>
    </>
  );
};

export default ChoiceColor;
