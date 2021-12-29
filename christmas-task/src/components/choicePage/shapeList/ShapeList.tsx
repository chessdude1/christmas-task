import React from "react";
import shapeListStyles from "./shapeList.module.css";

interface ShapeList {
  onClick: (shape: string) => void;
  shapes: Array<string>;
}

const NAMES = ["колокольчик", "шар", "шишка", "звезда", "снежинка", "фигурка"];

export const ShapeList: React.FC<ShapeList> = (props) => {
  return (
    <>
      <h2>Форма</h2>
      <div className={shapeListStyles.ShapeList}>
        {NAMES.map((name, id) => {
          const shapesStyles = [shapeListStyles.shape];
          props.shapes.includes(name)
            ? shapesStyles.push(shapeListStyles.active)
            : "";
          return (
            <div
              key={id}
              className={shapesStyles.join(" ")}
              onClick={() => {
                props.onClick(NAMES[id]);
              }}
            >
              <img
                src={
                  require(`../../../data/assets/shapeList/${id + 1}.svg`)
                    .default
                }
                alt="not found"
              ></img>
              <p className={shapeListStyles.shape__caption}>{NAMES[id]}</p>
            </div>
          );
        })}
      </div>
    </>
  );
};
