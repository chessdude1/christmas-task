import React from "react";
import buttonStyles from "./button.module.css";

interface Button {
  type: string;
  onClick: () => void;
  children: React.ReactChild | React.ReactNode;
}

const Button: React.FC<Button> = (props) => {
  const ButtonStyles = [buttonStyles.Button];
  if (props.type) {
    ButtonStyles.push(buttonStyles[props.type]);
  } else {
    ButtonStyles.push(`${buttonStyles.disabled}`);
  }
  return (
    <button onClick={props.onClick} className={ButtonStyles.join(" ")}>
      {props.children}
    </button>
  );
};

export default Button;
