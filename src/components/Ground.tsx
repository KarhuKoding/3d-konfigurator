import * as React from "react";
import * as THREE from "three";
import { BufferGeometry, Mesh, Material } from "three";

interface Props {}
type Ref = any;

export const Ground = React.forwardRef<Ref, Props>(({}, ref) => {
  return (
    <>
      <mesh rotation={[-Math.PI / 2, 0, 0]} ref={ref} position={[0, 0, 0]}>
        <planeGeometry attach="geometry" args={[10, 10]} />
        <meshBasicMaterial attach="material" />
      </mesh>
      <gridHelper></gridHelper>
    </>
  );
});
