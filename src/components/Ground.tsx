import * as React from "react";
import * as THREE from "three";
import { BufferGeometry, Mesh, Material } from "three";
import { Grid, MeshReflectorMaterial, Environment } from "@react-three/drei";
import { useControls } from "leva";
import { Walls } from "./env/Walls";

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
      {/* <color attach="background" args={["#191920"]} /> */}
      <fog attach="fog" args={["#191920", 0, 15]} />
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        ref={ref}
        position={[0, 0, 0]}
        receiveShadow
      >
        <planeGeometry args={[10, 5]} />
        <MeshReflectorMaterial
          blur={[300, 100]}
          resolution={2048}
          mixBlur={1}
          mixStrength={50}
          roughness={1}
          depthScale={1.2}
          minDepthThreshold={0.4}
          maxDepthThreshold={1.4}
          color="#050505"
          metalness={0.5}
          mirror={0} 
        />
      </mesh>
      <Grid position={[0, 0.01, 0]} args={gridSize} {...gridConfig} />
      <axesHelper args={[5]} />
      <Walls />
      <Environment preset="city" />
    </>
  );
});
