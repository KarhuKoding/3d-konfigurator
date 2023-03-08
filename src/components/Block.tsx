import * as React from "react";

interface Props {
  key: number;
  position: [x: number, y: number, z: number];
}
type Ref = any;

export const Block = React.forwardRef<Ref, Props>(({ key, position }, ref) => {
  const [x, y, z] = position;
  return (
    <mesh position={[x, y, z]} ref={ref} key={key}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={"blue"} />
    </mesh>
  );
});
