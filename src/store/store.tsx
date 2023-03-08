import { proxy } from "valtio";
import { State, eMode, ePick } from "../types";

const initState: State = {
  mode: eMode.DRAW,
  pick: ePick.BOX,
};

const state = proxy({
  ...initState,
});

export { state };
