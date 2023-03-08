import * as React from "react";

interface Props {
  position: [x: number, y: number, z: number];
}
type Ref = any;

export const Block = React.forwardRef<Ref, Props>(({ position }, ref) => {
  const [x, y, z] = position;
  return (
    <mesh position={[x, y, z]} ref={ref}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={"blue"} />
    </mesh>
  );
});
