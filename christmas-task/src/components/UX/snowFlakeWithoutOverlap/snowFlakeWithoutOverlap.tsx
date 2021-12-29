import React, { useState, useEffect } from "react";
import snowFlakeWithoutOverlapStyles from "./snowFlakeWithoutOverlap.module.css";



export const SnowFlakeWithoutOverlap = () => {
  const snowflakeTickTime = 5
  const typesOfSnowflakes = ["❅", "❆"];

  const initialSnowFlake = {
    snowFlakeElem: <div></div>,
    typeOfSnowFlake: "",
    top: 0,
    left: "0",
  };
  const [elem, setElem] = useState(initialSnowFlake);

  function getRandomXPosition() {
    return `${Math.floor(Math.random() * 100)}%`;
  }

  useEffect(() => {
    let timerId = setTimeout(function tick() {
      if (elem.top === 0) {
        const XPosition = getRandomXPosition();
        setElem({
          snowFlakeElem: (
            <li
              className={snowFlakeWithoutOverlapStyles.snowflakeContainer}
              style={{ left: XPosition, top: "5%" }} //initial top offset
            >
              {typesOfSnowflakes[Math.floor(Math.random() * 2)]}
            </li>
          ),
          typeOfSnowFlake: typesOfSnowflakes[Math.floor(Math.random() * 2)],
          top: 5,
          left: XPosition,
        });
      } else if (elem.top > 90) {
        setElem({
          snowFlakeElem: (
            <li
              className={snowFlakeWithoutOverlapStyles.snowflakeContainer}
              style={{ display: "none", left: 10000, top: `0%` }}
            >
              {elem.typeOfSnowFlake}
            </li>
          ),
          top: 0,
          left: "10000",
          typeOfSnowFlake: elem.typeOfSnowFlake,
        });
      } else {
        setElem({
          snowFlakeElem: (
            <li
              className={snowFlakeWithoutOverlapStyles.snowflakeContainer}
              style={{ left: elem.left, top: `${elem.top + 0.5}%` }}
            >
              {elem.typeOfSnowFlake}
            </li>
          ),
          top: elem.top + 0.5,
          left: elem.left,
          typeOfSnowFlake: elem.typeOfSnowFlake,
        });
      }
      timerId = setTimeout(tick, snowflakeTickTime);
    }, snowflakeTickTime);
    return function cleanup() {
      clearTimeout(timerId);
    };
  });
  return <>{elem ? elem.snowFlakeElem : ""}</>;
};
