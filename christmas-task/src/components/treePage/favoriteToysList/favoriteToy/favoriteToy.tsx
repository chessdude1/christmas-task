import { DragEvent, useState } from "react";
import favoriteToyStyle from "./favoriteToy.module.css";
import wideGarlandStyles from "../../../UX/wideGarland/wideGarland.module.css";

interface FavoriteToy {
  num: string;
  count: string;
}

export const FavoriteToy: React.FC<FavoriteToy> = (props) => {
  const initialPosition = {
    currentCount: Number(props.count),
    toysStyles: [
      {
        elemBelow: null as Element | null,
        diffX: 0,
        diffY: 0,
        style: {},
        border: "none",
      },
    ],
  };
  const [toyPosition, setToyPosition] = useState(initialPosition);

  function _dragStart(e: DragEvent, toyId: number) {
    const copyToysStyles = [...toyPosition.toysStyles];
    const currentToyPosition = [...toyPosition.toysStyles][toyId];
    currentToyPosition.diffX =
      e.screenX - e.currentTarget.getBoundingClientRect().left;
    currentToyPosition.diffY =
      e.screenY - e.currentTarget.getBoundingClientRect().top;
    copyToysStyles[toyId] = currentToyPosition;
    setToyPosition({
      ...toyPosition,
      toysStyles: copyToysStyles,
    });
  }

  function _dragging(e: DragEvent, toyId: number) {
    const elemBelow = document.elementFromPoint(
      e.screenX - toyPosition.toysStyles[toyId].diffX,
      e.screenY - toyPosition.toysStyles[toyId].diffY
    );
    const currentToysStyles = [...toyPosition.toysStyles];
    let currentToyStyle = { ...currentToysStyles[toyId].style };
    currentToyStyle = {
      ...currentToyStyle,
      border: "3px solid red",
      borderRadius: "20px",
    };
    currentToysStyles[toyId].style = currentToyStyle;
    if (elemBelow) {
      if (
        elemBelow.classList.contains("treeAvailableArea") ||
        elemBelow.classList.contains(wideGarlandStyles.lightrope)
      ) {
        const currentToysStyles = [...toyPosition.toysStyles];
        let currentToyStyle = { ...currentToysStyles[toyId].style };
        currentToyStyle = {
          ...currentToyStyle,
          border: "3px solid green",
          borderRadius: "20px",
        };
        currentToysStyles[toyId].style = currentToyStyle;
        setToyPosition({
          ...toyPosition,
          toysStyles: currentToysStyles,
        });
      } else {
        currentToysStyles[toyId] = {
          ...currentToysStyles[toyId],
          border: "3px solid red",
        };
        setToyPosition({
          ...toyPosition,
          toysStyles: currentToysStyles,
        });
      }
    }
  }

  function _dragEnd(e: DragEvent, toyId: number) {
    const elemBelow = document.elementFromPoint(
      e.screenX - toyPosition.toysStyles[toyId].diffX,
      e.screenY - toyPosition.toysStyles[toyId].diffY
    );

    if (elemBelow) {
      if (
        elemBelow.classList.contains("treeAvailableArea") ||
        elemBelow.classList.contains(wideGarlandStyles.lightrope)
      ) {
        const copyToysStyles = [...toyPosition.toysStyles];
        copyToysStyles.push({
          elemBelow: null as Element | null,
          diffX: 0,
          diffY: 0,
          style: {},
          border: "none",
        });
        const currentToyStyles: { top?: number; left?: number } = [
          ...toyPosition.toysStyles,
        ][toyId].style;
        let currentCount = 0;
        if (currentToyStyles.top && currentToyStyles.left) {
          //if toy already on tree counter dont change
          currentCount = toyPosition.currentCount;
        } else {
          currentCount = Number(toyPosition.currentCount) - 1;
        }
        copyToysStyles[toyId].style = {
          left: e.screenX - toyPosition.toysStyles[toyId].diffX,
          top: e.screenY - toyPosition.toysStyles[toyId].diffY,
        };
        setToyPosition({
          currentCount,
          toysStyles: copyToysStyles,
        });
        return;
      } else {
        dragEndForbidden(toyId);
      }
    } else {
      dragEndForbidden(toyId);
    }
  }

  function dragEndForbidden(toyId: number) {
    const copyToysStyles = [...toyPosition.toysStyles];
    let currentToyStyles: { top?: number; left?: number } = [
      ...toyPosition.toysStyles,
    ][toyId].style;
    let currentCount = toyPosition.currentCount;
    if (currentToyStyles.top && currentToyStyles.left) {
      //if toy was on tree it has top and left prop, if toy return in stack it must increment counter
      currentCount = toyPosition.currentCount + 1;
    }
    currentToyStyles = {};
    copyToysStyles[toyId].style = currentToyStyles;

    setToyPosition({
      ...toyPosition,
      currentCount: currentCount,
      toysStyles: copyToysStyles,
    });
  }

  function createNewImg() {
    const arrOfImg = [];
    for (let i = Number(props.count) - 1; i >= 0; i--) {
      // we start writing styles from the [0] Index in the array, but at the same time we use only props.count of array elements
      arrOfImg.push(i);
    }
    return arrOfImg.map((imgId) => {
      return (
        <img
          key={imgId}
          datatype={`favoriteToy-${imgId}`}
          onDragStart={(e: DragEvent) => {
            _dragStart(e, imgId);
          }}
          onDragEnd={(e: DragEvent) => {
            _dragEnd(e, imgId);
          }}
          onDrag={(e: DragEvent) => {
            _dragging(e, imgId);
          }}
          className={favoriteToyStyle.toyImg}
          style={
            toyPosition.toysStyles[imgId]
              ? toyPosition.toysStyles[imgId].style
              : {}
          }
          src={require(`../../../../data/assets/toys/${props.num}.png`).default}
        />
      );
    });
  }

  return (
    <div className={favoriteToyStyle.toyCard}>
      {createNewImg()}
      <div className={favoriteToyStyle.numberOfToy}>
        {toyPosition.currentCount}
      </div>
    </div>
  );
};
