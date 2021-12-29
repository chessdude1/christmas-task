import { SnowFlakeWithoutOverlapAux } from "../../UX/snowFlakeWithoutOverlap/snowFlakeWithoutOverlapAux";
import { WideGarland } from "../../UX/wideGarland/wideGarland";
import { TreeSettings } from "../treePageAux";
import canvasStyles from "./canvas.module.css";

interface Canvas {
  settingsTreePage: TreeSettings;
  snowFlakeStatus: boolean;
  snowflakePower: number;
}

export const Canvas: React.FC<Canvas> = (props) => {
  const backgroundCanvasStyles = [canvasStyles.canvasWrapper];
  const backgroundNumber = `background${String(
    props.settingsTreePage.backgroundNum
  )}`;
  backgroundCanvasStyles.push(canvasStyles[backgroundNumber]);
  
  return (
    <section className={backgroundCanvasStyles.join(" ")}>
      <img
        className={canvasStyles.treePicture}
        src={
          require(`../../../data/assets/tree/${String(
            props.settingsTreePage.treeNum
          )}.png`).default
        }
        useMap="#image-map"
      />
      {props.snowFlakeStatus ? (
        <SnowFlakeWithoutOverlapAux snowflakePower={props.snowflakePower} />
      ) : (
        ""
      )}

      {<WideGarland lightRopeColor={props.settingsTreePage.garlandName} />}

      <map name="image-map">
        <area
          className="treeAvailableArea"
          target=""
          alt=""
          title=""
          href=""
          coords="251,8,111,219,75,335,26,440,20,533,16,578,52,620,73,647,143,689,214,709,280,707,327,701,381,692,398,661,437,669,456,637,473,612,475,585,500,540,443,464,422,355,395,280,396,216,355,137,307,122,305,77,282,43"
          shape="poly"
        ></area>
      </map>
    </section>
  );
};
