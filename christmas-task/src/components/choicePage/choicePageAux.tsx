import React, { useEffect, useState } from "react";
import { ChoicePage } from "./choicePage";
import { Toys } from "../../App";

interface ChoicePageAux {
  theme: "dark" | "light";
  toys: Array<Toys>;
  setToys: React.Dispatch<React.SetStateAction<Toys[]>>;
}

export interface filter {
  findQuery: string;
  sortType: string;
  number: number | Array<number>;
  year: number | Array<number>;
  color: Array<string | never>;
  size: Array<string | never>;
  shape: Array<string | never>;
}

export const ChoicePageAux: React.FC<ChoicePageAux> = (props) => {
  const [filterSettings, SetFilterSetting] = useState<filter>({
    findQuery: "",
    sortType: "growNumber",
    number: [0, 15],
    year: [1940, 2020],
    color: [],
    size: [],
    shape: [],
  });

  window.addEventListener("beforeunload", setLocalStorageSettings);
  window.addEventListener("load", getLocalStorageSettings);

  function setLocalStorageSettings() {
    localStorage.setItem(
      "filterSettings__year",
      JSON.stringify(filterSettings.year)
    );
    localStorage.setItem(
      "filterSettings__color",
      JSON.stringify(filterSettings.color)
    );
    localStorage.setItem(
      "filterSettings__size",
      JSON.stringify(filterSettings.size)
    );
    localStorage.setItem(
      "filterSettings__shape",
      JSON.stringify(filterSettings.shape)
    );
    localStorage.setItem(
      "filterSettings__number",
      JSON.stringify(filterSettings.number)
    );
    localStorage.setItem("filterSettings__sortType", filterSettings.sortType);
    localStorage.setItem("filterSettings__findQuery", filterSettings.findQuery);
  }

  function getLocalStorageSettings() {
    const year = JSON.parse(
      localStorage.getItem("filterSettings__year") as string
    );

    const color = JSON.parse(
      localStorage.getItem("filterSettings__color") as string
    );

    const size = JSON.parse(
      localStorage.getItem("filterSettings__size") as string
    );

    const shape = JSON.parse(
      localStorage.getItem("filterSettings__shape") as string
    );

    const number = JSON.parse(
      localStorage.getItem("filterSettings__number") as string
    );

    const sortType = localStorage.getItem("filterSettings__sortType") as string;

    const findQuery = localStorage.getItem(
      "filterSettings__findQuery"
    ) as string;

    SetFilterSetting({
      findQuery: findQuery,
      sortType: sortType,
      number: number,
      year: year,
      color: color,
      size: size,
      shape: shape,
    });
  }

  const [emptyMessage, setEmptyMessage] = useState<string>("");
  const [filteredToys, setFilteredToys] = useState<Array<Toys>>([]);

  checkOnDoubleClick(filterSettings);

  useEffect(() => {
    const filteredToys = filterToys(props.toys);
    const sortedToys = sortToys(filteredToys);
    if (sortedToys.length === 0) {
      setEmptyMessage("Извините совпадений не обнаружено");
    } else {
      setEmptyMessage("");
    }
    setFilteredToys(sortedToys);
  }, [props.toys, filterSettings]);

  function checkOnDoubleClick(filterSetting: filter) {
    if (checkDuplicates(filterSetting.color)) {
      SetFilterSetting({
        ...filterSettings,
        color: getArrWithoutDuplicates(filterSetting.color),
      });
    }
    if (checkDuplicates(filterSetting.size)) {
      SetFilterSetting({
        ...filterSettings,
        size: getArrWithoutDuplicates(filterSetting.size),
      });
    }
    if (checkDuplicates(filterSetting.shape)) {
      SetFilterSetting({
        ...filterSettings,
        shape: getArrWithoutDuplicates(filterSetting.shape),
      });
    }
  }

  function countFavoriteToys(allToys: Array<Toys>) {
    const toys = [...allToys];
    const numberOfFavoriteToys = toys.filter((toy) => !!toy.favorite);
    return numberOfFavoriteToys.length;
  }

  const numberOfFavoriteToys = countFavoriteToys(props.toys);

  function checkDuplicates<T>(array: Array<T>): boolean {
    const setFromArr = new Set(array);
    return !(array.length === setFromArr.size);
  }

  function getArrWithoutDuplicates<T>(array: Array<T>) {
    const resultArr: Array<T> = [];
    for (let i = 0; i < array.length; i++) {
      if (array.lastIndexOf(array[i]) === array.indexOf(array[i])) {
        resultArr.push(array[i]);
      }
    }
    return resultArr;
  }

  function sortToys(toys: Array<Toys>) {
    let sortedToys = [...toys];
    if (filterSettings.sortType === "downNumber") {
      sortedToys = sortedToys.sort((b, a) => Number(a.count) - Number(b.count));
    }
    if (filterSettings.sortType === "growNumber") {
      sortedToys = sortedToys.sort((a, b) => Number(a.count) - Number(b.count));
    }
    if (filterSettings.sortType === "growName") {
      sortedToys = sortedToys.sort((a, b) => a.name.length - b.name.length);
    }
    if (filterSettings.sortType === "downName") {
      sortedToys = sortedToys.sort((a, b) => b.name.length - a.name.length);
    }
    if (filterSettings.sortType === "growYearBuy") {
      sortedToys = sortedToys.sort((a, b) => Number(a.year) - Number(b.year));
    }
    if (filterSettings.sortType === "downYearBuy") {
      sortedToys = sortedToys.sort((a, b) => Number(b.year) - Number(a.year));
    }
    if (filterSettings.sortType === "favorite") {
      sortedToys = sortedToys.filter((toy) => !!toy.favorite);
    }
    return sortedToys;
  }

  function filterToys(toys: Array<Toys>) {
    let filteredToys = [...toys];
    if (typeof filterSettings.number === "object") {
      filteredToys = filteredToys.filter(
        (toy) =>
          Number(toy.count) < (filterSettings.number as Array<number>)[1] &&
          Number(toy.count) > (filterSettings.number as Array<number>)[0]
      );
    } else {
      filteredToys = filteredToys.filter(
        (toy) => Number(toy.count) < filterSettings.number
      );
    }

    if (filterSettings.findQuery !== "") {
      filteredToys = filteredToys.filter((toy) =>
        toy.name.toUpperCase().includes(filterSettings.findQuery.toUpperCase())
      );
    }

    if (typeof filterSettings.year === "object") {
      filteredToys = filteredToys.filter(
        (toy) =>
          Number(toy.year) < (filterSettings.year as Array<number>)[1] &&
          Number(toy.year) > (filterSettings.year as Array<number>)[0]
      );
    } else {
      filteredToys = filteredToys.filter(
        (toy) => Number(toy.year) < filterSettings.year
      );
    }

    if (filterSettings.color.length) {
      filteredToys = filteredToys.filter((toy) =>
        filterSettings.color.includes(toy.color)
      );
    }

    if (filterSettings.size.length) {
      filteredToys = filteredToys.filter((toy) =>
        filterSettings.size.includes(toy.size)
      );
    }

    if (filterSettings.shape.length) {
      filteredToys = filteredToys.filter((toy) =>
        filterSettings.shape.includes(toy.shape)
      );
    }

    return filteredToys;
  }

  return (
    <ChoicePage
      numberOfFavoriteToys={numberOfFavoriteToys}
      setToys={props.setToys}
      filterSettings={filterSettings}
      SetFilterSetting={SetFilterSetting}
      toys={filteredToys}
      allToys={props.toys}
      theme="dark"
      emptyMessage={emptyMessage}
    />
  );
};
