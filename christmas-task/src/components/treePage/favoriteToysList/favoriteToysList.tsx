import { Toys } from "../../../App";
import { FavoriteToy } from "./favoriteToy/favoriteToy";
import favoriteToysListStyles from "./favoriteToysList.module.css";

interface favoriteToysList {
  toys: Array<Toys>;
  setToysForTree: React.Dispatch<React.SetStateAction<Array<Toys>>>;
}

export const FavoriteToysList: React.FC<favoriteToysList> = (props) => {
  return (
    <div>
      <h2>Игрушки</h2>
      <div className={favoriteToysListStyles.toysListWrapper}>
        {props.toys.map((toy) => {
          if (Number(toy.num) > 0) {
            //disable rendering of the initialization toy
            return (
              <div key={toy.num}>
                <FavoriteToy num={toy.num} count={toy.count} />
              </div>
            );
          }
        })}
      </div>
    </div>
  );
};
