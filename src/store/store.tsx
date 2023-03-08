import { proxy } from "valtio";
import { State, eMode, ePick } from "../types";

const initState: State = {
  mode: eMode.PICK,
  pick: ePick.BOX,
};

const state = proxy({
  ...initState,
});

export { state };
