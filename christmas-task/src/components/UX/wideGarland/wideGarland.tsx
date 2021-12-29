import wideGarlandStyles from "./wideGarland.module.css";

interface WideGarland {
  lightRopeColor: string;
}

export const WideGarland: React.FC<WideGarland> = (props) => {
  const numberOfGarlands = 6;
  const stepBetweenGarlands = 10;
  const sizeOfFirstGarland = 7; //add a slider that switches the number of garlands (the number must be odd)

  function generateGarland(
    numberOfGarlands: number,
    sizeOfFirstGarland: number,
    incrementLightBetweenGarlands: number
  ) {
    const arrOfSizeGarlands = [];
    for (let i = 0; i < numberOfGarlands; i++) {
      arrOfSizeGarlands.push(
        sizeOfFirstGarland + i * incrementLightBetweenGarlands
      );
    }
    return arrOfSizeGarlands;
  }

  function generateRotateOfGarland(
    garlandSizes: Array<number>,
    stepBetweenGarlands: number
  ) {
    const rotateOfGarlands = [];
    const minRangeOfGarland = 180 - stepBetweenGarlands * garlandSizes.length;
    for (let i = 0; i < garlandSizes.length; i++) {
      const currentRange = minRangeOfGarland + i * stepBetweenGarlands;
      rotateOfGarlands.push(
        generateOneRowRotate(currentRange, garlandSizes[i])
      );
    }
    return rotateOfGarlands;
  }

  const garlandsWithRotations = generateRotateOfGarland(
    generateGarland(numberOfGarlands, sizeOfFirstGarland, 2),
    stepBetweenGarlands
  );

  function generateOneRowRotate(
    currentRange: number,
    currentGarlandSize: number
  ) {
    const rotate = [];
    const IndexOfMiddleLight = Math.floor(currentGarlandSize / 2);
    const step = (currentRange - 90) / IndexOfMiddleLight;
    for (let i = 0; i < currentGarlandSize; i++) {
      if (i === IndexOfMiddleLight) {
        rotate.push(90);
      } else {
        rotate.push(currentRange - step * i);
      }
    }
    return rotate;
  }

  return (
    <div
      onDragOver={(e) => {
        e.preventDefault(), (e.dataTransfer!.dropEffect = "move");
      }}
      className={wideGarlandStyles.garlandContainer}
    >
      {garlandsWithRotations.map((garland, id) => {
        return (
          <ul
            key={id}
            style={{
              marginTop: `${id * 7}vh`,
              width: `${id * 5}vw`,
              height: `${id * 10}vh`,
            }}
            className={wideGarlandStyles.lightrope}
          >
            {garland.map((light) => {
              const lightRopeStyles = [wideGarlandStyles.lightrope__lightBulb];
              if (props.lightRopeColor) {
                lightRopeStyles.push(
                  wideGarlandStyles[`lightRope__${props.lightRopeColor}`]
                );
              }
              return (
                <li
                  key={light + Math.random()}
                  className={lightRopeStyles.join(" ")}
                  style={{
                    transform: `rotate(${light}deg) translate(${
                      60 + id * 10
                    }px) rotate(-${light}deg)`,
                  }}
                ></li>
              );
            })}
          </ul>
        );
      })}
    </div>
  );
};
