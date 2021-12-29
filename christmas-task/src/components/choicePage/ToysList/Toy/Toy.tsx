import toyStyles from "./toy.module.css";
interface toyView {
  count: string;
  year: string;
  size: string;
  color: string;
  favorite: boolean;
  name: string;
  shape: string;
  makeToyFavorite: () => void;
  num: string;
}

export const Toy: React.FC<toyView> = (props) => {
  const toyWrapperStyles = [toyStyles.toy__wrapper];
  props.favorite ? toyWrapperStyles.push(toyStyles.toy__favorite) : "";
  return (
    <div
      className={toyWrapperStyles.join(" ")}
      onClick={() => {
        props.makeToyFavorite();
      }}
    >
      <h3>{props.name}</h3>
      <img
        className={toyStyles.toy__img}
        src={require(`../../../../data/assets/toys/${props.num}.png`).default}
      ></img>
      <p>Количество: {props.count}</p>
      <p>Год покупки: {props.year} год</p>
      <p>Форма игрушки: {props.shape}</p>
      <p>Цвет игрушки: {props.color}</p>
      <p>размер игрушки: {props.size}</p>
      <p>Любимая: {props.favorite ? "Да" : "Нет"}</p>
    </div>
  );
};
