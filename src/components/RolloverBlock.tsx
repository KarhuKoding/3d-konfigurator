import * as React from "react";
import { tMode, eMode } from "../types";

interface Props {
  geomerty: any;
  mode: tMode;
}
type Ref = any;

export const RolloverBlock = React.forwardRef<Ref, Props>(
  ({ geomerty = <boxGeometry args={[1, 1, 1]} />, mode }, ref) => {
    React.useEffect(() => {
      if (mode === eMode.DRAW) {
        // @ts-ignore
        ref.current.visible = true;
      } else if (mode === eMode.IDLE) {
        // @ts-ignore
        ref.current.visible = false;
      }
    }, [mode]);

    return (
      <mesh ref={ref} position={[0, 0, 0]} visible={false}>
        {geomerty}
        <meshStandardMaterial
          color={0xff0000}
          transparent={true}
          opacity={0.5}
        />
      </mesh>
    );
  }
);
