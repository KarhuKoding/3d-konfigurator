import * as React from "react";
import * as THREE from "three";
import { BufferGeometry, Mesh, Material } from "three";
import { Grid } from "@react-three/drei";
import { useControls } from "leva";

interface Props {}
type Ref = any;

export const Ground = React.forwardRef<Ref, Props>(({}, ref) => {
  const { gridSize, ...gridConfig } = useControls({
    gridSize: [10, 5],
     cellSize: { value: 0.5, min: 0, max: 10, step: 0.1 },
    // cellThickness: { value: 1, min: 0, max: 5, step: 0.1 },
     cellColor: "green",
    // sectionSize: { value: 3.3, min: 0, max: 10, step: 0.1 },
    // sectionThickness: { value: 1.5, min: 0, max: 5, step: 0.1 },
     sectionColor: "#3fe83f",
   
    // fadeStrength: { value: 1, min: 0, max: 1, step: 0.1 },
    // followCamera: false,
    // infiniteGrid: true,
  });
  return (
    <>
      <mesh rotation={[-Math.PI / 2, 0, 0]} ref={ref} position={[0, 0, 0]}>
        <planeGeometry attach="geometry" args={[10, 5]} />
      </mesh>
      <Grid position={[0, 0.01, 0]} args={gridSize} {...gridConfig} />
      <axesHelper args={[5]} />
    </>
  );
});
