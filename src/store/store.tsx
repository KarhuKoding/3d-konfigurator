import { proxy } from "valtio";
import { tMode, tPick, eMode, ePick } from "../types";
import { devtools } from "valtio/utils";

export type State = {
  mode: tMode;
  pick: tPick;
  selectedBlock: any;
};

const initState: State = {
  mode: eMode.IDLE,
  pick: ePick.CHAIR_1,
  selectedBlock: null,
};

const state = proxy({
  ...initState,
});

devtools(state, { name: "app-state", enabled: true });

export { state };
