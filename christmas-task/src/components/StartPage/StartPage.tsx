import React from "react";
import Button from "../UI/button/button";
import startPageStyles from "./startPage.module.css";
import { Link } from "react-router-dom";

interface StartPage {
  theme: "dark" | "light";
}

export const StartPage: React.FC<StartPage> = (props) => {
  const themeStyles = [];
  if (props.theme === "light") {
    themeStyles.push(startPageStyles.lightThemeMainPage);
  } else {
    themeStyles.push(startPageStyles.darkThemeMainPage);
  }

  return (
    <main className={startPageStyles.mainPageWrapper}>
      <section className={themeStyles.join(" ")}>
        <div className={startPageStyles.Greeting}>
          ПОМОГИТЕ БАБУШКЕ НАРЯДИТЬ ЕЛКУ
        </div>
        <Button
          type={"big"}
          onClick={() => {
            ("");
          }}
        >
          <Link className={startPageStyles.linkToChoice} to="/choice">
            Старт
          </Link>
        </Button>
      </section>
    </main>
  );
};
