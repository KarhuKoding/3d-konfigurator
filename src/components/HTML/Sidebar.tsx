import { useSnapshot } from "valtio";
import { state } from "../../store/store";
import { eMode, ePick, tMode, tPick } from "../../types";
import { availableBlocks } from "../../blocks";
import { SidebarElement } from "./SidebarElement";

const Sidebar = () => {
  const snap = useSnapshot(state);

  const handleOnPick = (pick: tPick) => {
    state.pick = pick;
    state.mode = eMode.DRAW;
  };
  
  return (
    <section className="sidebarWrapper">
      <ul className="sidebarElement">
        {availableBlocks.map((element) => {
          return (
            <SidebarElement
              element={element}
              key={element.description}
              handleOnPick={(pick: tPick) => handleOnPick(pick)}
            />
          );
        })}
      </ul>

      {JSON.stringify(snap, null, 2)}
    </section>
  );
};

export default Sidebar;
