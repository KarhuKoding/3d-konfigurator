import * as React from "react";

interface Props {
  geomerty: any;
}
type Ref = any;

export const RolloverBlock = React.forwardRef<Ref, Props>(
  ({ geomerty = <boxGeometry args={[1, 1, 1]} /> }, ref) => {
    return (
      <mesh ref={ref} position={[0, 0, 0]}>
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
