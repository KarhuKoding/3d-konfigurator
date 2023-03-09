import { useSnapshot } from "valtio";
import { state } from "../../store/store";
import { eMode, ePick, tMode, tPick } from "../../types";
import { availableBlocks } from "../../blocks";

const MeshPicker = () => {
  const snap = useSnapshot(state);

  const handleClick = (pick: tPick) => {
    state.pick = pick;
  };

  return (
    <ul>
      {availableBlocks.map((block) => {
        return (
          <li
            onClick={() => handleClick(block.description)}
            className={snap.pick === block.description ? "selected" : ""}
            key={block.title}
          >
            {block.title}
          </li>
        );
      })}
    </ul>
  );
};

const ModeForm = () => {
  const snap = useSnapshot(state);

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    const val = e.target.value as tMode;
    state.mode = val;
  };

  return (
    <form>
      <label>
        <input
          type="radio"
          name={eMode.IDLE}
          value={eMode.IDLE}
          checked={snap.mode === eMode.IDLE}
          onChange={handleOnChange}
        />
        IDLE
      </label>
      <label>
        <input
          type="radio"
          name={eMode.DRAW}
          value={eMode.DRAW}
          checked={snap.mode === eMode.DRAW}
          onChange={handleOnChange}
        />
        Draw
      </label>
      <label>
        <input
          type="radio"
          name={eMode.PICK}
          value={eMode.PICK}
          checked={snap.mode === eMode.PICK}
          onChange={handleOnChange}
        />
        Pick
      </label>
    </form>
  );
};

const Sidebar = () => {
  return (
    <section className="sidebarWrapper">
      <h2>Sidebar</h2>
      <hr />
      <MeshPicker />
      <ModeForm />
    </section>
  );
};

export default Sidebar;
