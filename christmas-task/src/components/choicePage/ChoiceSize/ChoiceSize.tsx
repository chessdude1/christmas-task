import { Checkbox } from "../../UI/checkbox/checkbox";
import choiceSizeStyles from "./choiceSize.module.css";

interface ChoiceSize {
  onClick: (size: string) => void;
  size: Array<string>;
}

const SIZES = ["большой", "средний", "малый"];

export const ChoiceSize: React.FC<ChoiceSize> = (props) => {
  return (
    <>
      <h2>Размер</h2>
      <div className={choiceSizeStyles.ChoiceSizeWrapper}>
        {SIZES.map((size) => {
          return (
            <div key={size}>
              <Checkbox
                onClick={() => {
                  props.onClick(size);
                }}
                isActive={props.size.includes(size)}
                type="primary"
                name={size}
              />
            </div>
          );
        })}
      </div>
    </>
  );
};
