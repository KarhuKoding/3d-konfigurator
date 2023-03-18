import { useSnapshot } from "valtio";
import { availableBlocks } from "../../blocks";
import { state } from "../../store/store";
import { tPick } from "../../types";

import "./SidebarElement.scss";

export const SidebarElement = ({
  element,
  handleOnPick,
}: {
  element: any;
  handleOnPick: any;
}) => {
  return (
    <li
      onClick={() => handleOnPick(element.description)}
      // className={snap.pick === block.description ? "selected" : ""}
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
