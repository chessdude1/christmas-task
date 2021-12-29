import { Link } from "react-router-dom";
import treeIcon from "../../data/assets/svg/tree.svg";
import headerStyles from "./header.module.css";
import settingsIcon from "../../data/assets/settings/settingsIcon.svg";

interface SettingsModal {
  setModalWindowStatus: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Header: React.FC<SettingsModal> = (props) => {
  return (
    <header className={headerStyles.headerWrapper}>
      <div className={headerStyles.header__controls}>
        <div>
          <Link className={headerStyles.header__link} to="/">
            <img className={headerStyles.header__logo} src={treeIcon}></img>
          </Link>
        </div>

        <Link className={headerStyles.header__link} to="/choice">
          ИГРУШКИ
        </Link>
        <Link className={headerStyles.header__link} to="/treePage">
          ЕЛКА
        </Link>
      </div>
      <div className={headerStyles.header__settings}>
        <img
          onClick={() => {
            props.setModalWindowStatus(true);
          }}
          className={headerStyles.header__settingsLogo}
          src={settingsIcon}
        ></img>
      </div>
    </header>
  );
};
