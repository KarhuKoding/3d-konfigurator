import { proxy } from "valtio";
import { tMode, tPick, eMode, ePick } from "../types";
import { devtools } from "valtio/utils";

export type State = {
  mode: tMode;
  pick: tPick;
  selectedBlock: any;
};

const initState: State = {
  mode: eMode.DRAW,
  pick: ePick.BOX,
  selectedBlock: null,
};

const state = proxy({
  ...initState,
});

devtools(state, { name: "app-state", enabled: true });

export { state };
