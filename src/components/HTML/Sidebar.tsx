import { useSnapshot } from "valtio";
import { state } from "../../store/store";
import { eMode, ePick, tMode, tPick } from "../../types";

const MeshPicker = () => {
  const snap = useSnapshot(state);

  const handleClick = (pick: tPick) => {
    state.pick = pick;
  };

  return (
    <ul>
      <li
        onClick={() => handleClick(ePick.BOX)}
        className={snap.pick === ePick.BOX ? "selected" : ""}
      >
        Box
      </li>
      <li
        onClick={() => handleClick(ePick.BOX_LARGE)}
        className={snap.pick === ePick.BOX_LARGE ? "selected" : ""}
      >
        Big Box
      </li>
    </ul>
  );
};

const ModeForm = () => {
  const snap = useSnapshot(state);

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value as tMode;
    state.mode = val;
  };

  return (
    <form>
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
