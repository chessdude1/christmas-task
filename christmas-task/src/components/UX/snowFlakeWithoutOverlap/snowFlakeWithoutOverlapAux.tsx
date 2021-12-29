import React, { useState, useEffect } from "react";
import { SnowFlakeWithoutOverlap } from "./snowFlakeWithoutOverlap";

interface SnowFlakeWithoutOverlapAux {
  snowflakePower: number;
}

export const SnowFlakeWithoutOverlapAux: React.FC<SnowFlakeWithoutOverlapAux> =
  (props) => {
    const snowflakesReloadTime = 5000;

    const [SnowFlakesNumberArr, setSnowFlakesNumberArr] = useState<
      Array<number>
    >([]);

    useEffect(() => {
      let timerId = setTimeout(function tick() {
        const localSnowFlakesNumberArr = [];
        const randomNumOfSnowFlakes = generateSnowFlakesNumber();
        for (let i = 0; i < randomNumOfSnowFlakes; i++) {
          localSnowFlakesNumberArr.push(i);
        }
        setSnowFlakesNumberArr(localSnowFlakesNumberArr);
        timerId = setTimeout(tick, snowflakesReloadTime);
      }, snowflakesReloadTime);
      return function cleanup() {
        clearTimeout(timerId);
      };
    });

    function generateSnowFlakesNumber() {
      return Math.floor(Math.random() * props.snowflakePower);
    }

    return (
      <>
        {SnowFlakesNumberArr.map(() => {
          return <SnowFlakeWithoutOverlap />;
        })}
      </>
    );
  };
