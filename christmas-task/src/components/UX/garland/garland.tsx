import React from "react";
import "./garland.css";

export const Garland = () => {
  const numberOfGarlands = 5;

  function generateNumberOfGarlandsArr(numberOfGarlands: number) {
    const numberOfGarlandsArr: Array<number> = [];
    for (let i = 1; i <= numberOfGarlands; i++) {
      numberOfGarlandsArr.push(i);
    }
    return numberOfGarlandsArr;
  }

  function generateLights(numberOfGarland: number) {
    const lights = [];
    for (let i = 0; i < numberOfGarland * 3; i++) {
      lights.push(i);
    }
    return lights;
  }

  return (
    <div className="garland-tree-container">
      {generateNumberOfGarlandsArr(numberOfGarlands).map((garland) => {
        return (
          <ul
            className="lightRope"
            style={{
              width: `${100 + garland * 30}px`,
              height: `${100 + garland * 30}px`,
              margin: `${garland * 70}px auto 0`,
            }}
          >
            {generateLights(garland).map((light) => {
              return (
                <li
                  className="garland blink"
                  style={{
                    animationDuration: `${light % 4}s`,
                    backgroundColor: "white",
                    transform: `rotate(${
                      (10 - garland + light) * 8
                    }deg) translate(${garland * 20}px) rotate(-${
                      (10 - garland + light) * 8
                    }deg)`,
                  }}
                />
              );
            })}
          </ul>
        );
      })}
    </div>
  );
};

export default Garland;
