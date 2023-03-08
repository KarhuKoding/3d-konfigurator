import * as React from "react";


interface Props {}
type Ref = any;

export const RolloverBlock = React.forwardRef<Ref, Props>(({}, ref) => {
  return (
    <mesh ref={ref} position={[0, 0.5, 0]}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={0xff0000} transparent={true} opacity={0.5} />
    </mesh>
  );
});
