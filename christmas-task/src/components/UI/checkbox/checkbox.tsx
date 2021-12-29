import CheckBoxStyles from "./checkbox.module.css";

interface Checkbox {
  color?: string;
  isActive: boolean;
  type?: "primary";
  name?: string;
  onClick: () => void;
}

export const Checkbox: React.FC<Checkbox> = (props) => {
  const checkBoxStyles = [CheckBoxStyles.Checkbox];
  if (props.color === "красный") {
    checkBoxStyles.push(CheckBoxStyles.red);
  } else if (props.color === "белый") {
    checkBoxStyles.push(CheckBoxStyles.white);
  } else if (props.color === "желтый") {
    checkBoxStyles.push(CheckBoxStyles.yellow);
  } else if (props.color === "синий") {
    checkBoxStyles.push(CheckBoxStyles.blue);
  } else if (props.color === "зелёный") {
    checkBoxStyles.push(CheckBoxStyles.green);
  }

  if (props.isActive) {
    checkBoxStyles.push(CheckBoxStyles.active);
  }

  if (props.type === "primary") {
    checkBoxStyles.push(CheckBoxStyles.primary);
  }

  return (
    <div className={CheckBoxStyles.CheckboxWrapper}>
      <div onClick={props.onClick} className={checkBoxStyles.join(" ")} />
      {props.type && (
        <p className={CheckBoxStyles.checkBoxName}> {props.name}</p>
      )}
    </div>
  );
};
