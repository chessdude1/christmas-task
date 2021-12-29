import { Routes, Route } from "react-router-dom";
import React from "react";
import { StartPage } from "../startPage/startPage";
import { Toys } from "../../App";
import { ChoicePageAux } from "../choicePage/choicePageAux";
import { TreePageAux } from "../treePage/treePageAux";

interface Navigation {
  toys: Array<Toys>;
  setToys: React.Dispatch<React.SetStateAction<Toys[]>>;
  snowflakePower: number;
}

export const Navigation: React.FC<Navigation> = (props) => {
  return (
    <Routes>
      <Route path="" element={<StartPage theme="dark" />}></Route>
      <Route
        path="/choice"
        element={
          <ChoicePageAux
            setToys={props.setToys}
            toys={props.toys}
            theme="dark"
          />
        }
      ></Route>
      <Route
        path="/treePage"
        element={
          <TreePageAux
            snowflakePower={props.snowflakePower}
            toys={props.toys}
          />
        }
      ></Route>
      <Route path="*" element={<h1>Error</h1>}></Route>
    </Routes>
  );
};
