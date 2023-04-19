import { Canvas } from "@react-three/fiber";
import { useCallback, useState } from "react";
import Sidebar from "./components/HTML/Sidebar";
import { useEventListener } from "./hooks/useEventListener";
import MainGround from "./components/Main";
import { OrbitControls } from "@react-three/drei";
import { useSnapshot } from "valtio";
import { state } from "./store/store";
import "./index.css";

function App() {
  const [showOverlay, setShowOverlay] = useState(false);
  const [selection, setSelection] = useState(null);
  const snap = useSnapshot(state);

  const playAudio = () => {
    if (selection === null) return;

    switch (selection) {
      case "opt-1":
        console.log("opt-1");
        break;
      case "opt-2":
        console.log("opt-2");
        break;
      case "opt-3":
        console.log("opt-3");
        break;
      case "opt-4":
        console.log("opt-4");
        break;
      default:
        console.error("Failed played audio");
        break;
    }
  };

  const handler = useCallback(
    ({ code }: { code: string }) => {
      if (code === "KeyE") {
        setShowOverlay(true);
      }
      return;
    },
    [setShowOverlay]
  );

  const handlerKeyup = useCallback(
    ({ code }: { code: string }) => {
      if (code === "KeyE") {
        setShowOverlay(false);
        playAudio();
      }
      return;
    },
    [setShowOverlay, selection]
  );

  useEventListener("keydown", handler);
  useEventListener("keyup", handlerKeyup);

  return (
    <>
      <div className="App">
        {/* {showOverlay ? (
          <SelectionWheel onSelected={setSelection} />
        ) : (
          <div style={{ position: "absolute" }}>
            <h3>Please Press KeyE</h3>
          </div>
        )} */}

        {/* <Sidebar /> */}
        <section className="canvasWrapper">
          <Canvas camera={{ position: [2.5, 4, 7] }}>
            <pointLight position={[10, 10, 10]} />
            <MainGround />
            <OrbitControls enabled={!snap.isDragging}></OrbitControls>
          </Canvas>
        </section>
      </div>
    </>
  );
}

export default App;
