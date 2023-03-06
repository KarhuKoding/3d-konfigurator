import { Canvas } from "@react-three/fiber";
import { useCallback, useState } from "react";
import SelectionWheel from "./components/selectionwheel";
import { MeshPicker } from "./components/MeshPicker";
import { useEventListener } from "./useEventListener";
import MainGround from "./components/MainGround";
import { OrbitControls } from "@react-three/drei";

import "./index.scss";

function App() {
  const [showOverlay, setShowOverlay] = useState(false);
  const [selection, setSelection] = useState(null);

  const [picker, setPicker] = useState("box");

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
  // Add event listener using our hook
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

        <section className="sidebarWrapper">
          <h2>Sidebar</h2>
          <hr />
          <MeshPicker setPicker={setPicker} picker={picker} />
        </section>
        <section className="canvasWrapper">
          <Canvas>
            <pointLight position={[10, 10, 10]} />
            <MainGround picker={picker} />
            <OrbitControls></OrbitControls>
          </Canvas>
        </section>
      </div>
    </>
  );
}

export default App;
