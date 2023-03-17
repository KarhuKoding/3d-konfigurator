import { useSnapshot } from "valtio";
import { availableBlocks } from "../../blocks";
import { state } from "../../store/store";
import { tPick } from "../../types";
//@ts-ignore
import ChairPreview from "../../assets/chair.PNG";

import "./SidebarElement.scss";

export const MeshPicker = () => {
  const snap = useSnapshot(state);

  const handleClick = (pick: tPick) => {
    state.pick = pick;
  };

  return (
    <ul className="sidebarElement">
      {availableBlocks.map((block) => {
        return (
          <li
            onClick={() => handleClick(block.description)}
            // className={snap.pick === block.description ? "selected" : ""}
            key={block.title}
            className="sidebarElement__item"
          >
            <div className="sidebarElement__details">
              <div className="sidebarElement__title">{block.title}</div>
              <div className="sidebarElement__price">
                <span className="sidebarElement__price--bold">ab 534,40 €</span>
                <span className="sidebarElement__price">zzgl. MwSt</span>
              </div>
            </div>
            <div className="sidebarElement__preview">
              <img alt="preview" src={ChairPreview}></img>
            </div>
          </li>
        );
      })}
    </ul>
  );
};
