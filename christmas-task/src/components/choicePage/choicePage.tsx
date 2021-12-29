import React from "react";
import Button from "../UI/button/button";
import { Input } from "../UI/input/input";
import { Select } from "../UI/select/select";
import ChoiceColor from "./choiceColor/choiceColor";
import choicePageStyles from "./choicePage.module.css";
import { ChoiceSize } from "./choiceSize/choiceSize";
import { ShapeList } from "./shapeList/shapeList";
import { Toys } from "../../App";
import { ToysList } from "./toysList/toysList";
import { filter } from "./choicePageAux";
import { Link } from "react-router-dom";
import { SnackBarMUI } from "../UX/snackBarMUI/snackBarMUI";
import { SliderMUI } from "../UI/sliderMUI/sliderMUI";

interface ChoicePage {
  theme: "dark" | "light";
  toys: Array<Toys>;
  SetFilterSetting: React.Dispatch<React.SetStateAction<filter>>;
  filterSettings: filter;
  setToys: React.Dispatch<React.SetStateAction<Toys[]>>;
  allToys: Array<Toys>;
  emptyMessage: string;
  numberOfFavoriteToys: number;
}

const OPTIONS = [
  { value: "growNumber", text: "Возрастанию количества" },
  { value: "downNumber", text: "Убыванию количества" },
  { value: "growYearBuy", text: "Возрастанию года приобретения" },
  { value: "downYearBuy", text: "Убыванию года приобретения" },
  { value: "growName", text: "Возрастанию названия" },
  { value: "downName", text: "Убыванию названия" },
  { value: "favorite", text: "Избранным" },
];

export const ChoicePage: React.FC<ChoicePage> = (props) => {
  const choiceWrapperStyles = [choicePageStyles.choicePageWrapper];
  if (props.theme === "dark") {
    choiceWrapperStyles.push(choicePageStyles.choicePageDark);
  } else if (props.theme === "light") {
    choicePageStyles.choicePageLight;
  }

  return (
    <main className={choiceWrapperStyles.join(" ")}>
      <aside className={choicePageStyles.leftBar}>
        <Input
          value={props.filterSettings.findQuery}
          placeholder="Поиск"
          type="dark"
          onChange={(e) => {
            props.SetFilterSetting({
              ...props.filterSettings,
              findQuery: (e.target as HTMLInputElement).value,
            });
          }}
        ></Input>
        <div className={choicePageStyles.leftBar__sort}>
          <Select
            onChange={(e) => {
              props.SetFilterSetting({
                ...props.filterSettings,
                sortType: (e.target as HTMLInputElement).value,
              });
            }}
            theme="dark"
            label="Сортировать по:"
            options={OPTIONS}
          />
        </div>
        <SliderMUI
          color="secondary"
          step={1}
          min={0}
          max={15}
          title={"Количество экземпляров"}
          initialValue={[
            (props.filterSettings.number as Array<number>)[0],
            (props.filterSettings.number as Array<number>)[1],
          ]}
          onChange={(currentData) => {
            props.SetFilterSetting({
              ...props.filterSettings,
              number: currentData,
            });
          }}
        />

        <SliderMUI
          color="secondary"
          step={5}
          min={1940}
          max={2022}
          title={"Год приобретения"}
          initialValue={[
            (props.filterSettings.year as Array<number>)[0],
            (props.filterSettings.year as Array<number>)[1],
          ]}
          onChange={(currentData) => {
            props.SetFilterSetting({
              ...props.filterSettings,
              year: currentData,
            });
          }}
        />

        <ShapeList
          shapes={props.filterSettings.shape}
          onClick={(shape: string) => {
            props.SetFilterSetting({
              ...props.filterSettings,
              shape: [...props.filterSettings.shape, shape],
            });
          }}
        />
        <ChoiceColor
          color={props.filterSettings.color}
          onClick={(color: string) => {
            props.SetFilterSetting({
              ...props.filterSettings,
              color: [...props.filterSettings.color, color],
            });
          }}
        />
        <ChoiceSize
          size={props.filterSettings.size}
          onClick={(size) => {
            props.SetFilterSetting({
              ...props.filterSettings,
              size: [...props.filterSettings.size, size],
            });
          }}
        />
        <div className={choicePageStyles.numberOfFavoriteToys}>
          {props.numberOfFavoriteToys >= 20
            ? "Извините все слоты заполены"
            : `Количество игрушек в избранном : ${props.numberOfFavoriteToys}`}
        </div>
        {props.numberOfFavoriteToys >= 20 ? (
          <SnackBarMUI message="Извините все слоты заполенены" />
        ) : (
          ""
        )}
        <div className={choicePageStyles.controls}>
          <Button
            type="small"
            onClick={() => {
              props.SetFilterSetting({
                ...props.filterSettings,
                number: [0, 15],
                year: [1940, 2020],
                color: [],
                size: [],
                shape: [],
              });
            }}
          >
            Сбросить фильтры
          </Button>
          <Button
            type="small"
            onClick={() => {
              ("");
            }}
          >
            <Link
              className={choicePageStyles.controls__linkTreePage}
              to="/treePage"
            >
              Старт
            </Link>
          </Button>
        </div>
      </aside>
      <section className={choicePageStyles.toys}>
        {props.emptyMessage === "" ? (
          <ToysList
            numberOfFavoriteToys={props.numberOfFavoriteToys}
            allToys={props.allToys}
            setToys={props.setToys}
            toys={props.toys}
          />
        ) : (
          props.emptyMessage
        )}
      </section>
    </main>
  );
};
