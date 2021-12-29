import React from "react";
import { Toys } from "../../../App";
import { Toy } from "./toy/toy";
import "./toysList.css";
import { CSSTransition, TransitionGroup } from "react-transition-group";

interface ToysList {
  toys: Array<Toys>;
  setToys: React.Dispatch<React.SetStateAction<Toys[]>>;
  allToys: Array<Toys>;
  numberOfFavoriteToys: number;
}

export const ToysList: React.FC<ToysList> = (props) => {
  function setFavoriteToy(toys: Array<Toys>, toyNum: string) {
    const toysCopy = [...props.allToys];
    if (props.numberOfFavoriteToys >= 20) {
      //if number of toys more then 20 we can only delete from favorites
      for (let i = 0; i < toys.length; i++) {
        if (toys[i].num === toyNum) {
          toysCopy[Number(toyNum) - 1].favorite === true
            ? (toysCopy[Number(toyNum) - 1].favorite = false)
            : "";
          return toysCopy;
        }
      }
    } else {
      // in other cases, we can both delete and add to favorites
      for (let i = 0; i < toys.length; i++) {
        if (toys[i].num === toyNum) {
          toysCopy[Number(toyNum) - 1].favorite === true
            ? (toysCopy[Number(toyNum) - 1].favorite = false)
            : (toysCopy[Number(toyNum) - 1].favorite = true);
          return toysCopy;
        }
      }
    }
    return toysCopy;
  }

  return (
    <TransitionGroup className="ToysListWrapper">
      {props.toys.map((toy, id) => {
        return (
          <CSSTransition key={id} timeout={1000} classNames="item">
            <Toy
              key={toy.num}
              makeToyFavorite={() => {
                props.setToys(setFavoriteToy(props.toys, toy.num));
              }}
              name={toy.name}
              shape={toy.shape}
              year={toy.year}
              size={toy.size}
              count={toy.count}
              color={toy.color}
              favorite={toy.favorite}
              num={toy.num}
            />
          </CSSTransition>
        );
      })}
    </TransitionGroup>
  );
};
