import { useSnapshot } from "valtio";
import { availableBlocks } from "../../blocks";
import { state } from "../../store/store";
import { tPick } from "../../types";

import "./SidebarElement.scss";

export const MeshPicker = ({ element }: { element: any }) => {
  const handleClick = (pick: tPick) => {
    state.pick = pick;
  };

  return (
    <li
      onClick={() => handleClick(element.description)}
      // className={snap.pick === block.description ? "selected" : ""}
      key={element.meta.title}
      className="sidebarElement__item"
    >
      <div className="sidebarElement__details">
        <div className="sidebarElement__title">{element.meta.title}</div>
        <div className="sidebarElement__price">
          <span className="sidebarElement__price--bold">
            {element.meta.price}
          </span>
          <span className="sidebarElement__price">zzgl. MwSt</span>
        </div>
      </div>
      <div className="sidebarElement__preview">
        <img alt="preview" src={element.meta.imgSrc}></img>
      </div>
    </li>
  );
};
