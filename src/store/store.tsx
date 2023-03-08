import { proxy } from "valtio";
import { State, eMode } from "../types";

const initState: State = {
  mode: eMode.DRAW,
  pick: "Box",
};

const state = proxy({
  ...initState,
});

export { state };
