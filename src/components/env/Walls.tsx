import * as THREE from "three";
import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { GLTF } from "three-stdlib";

type GLTFResult = GLTF & {
  nodes: {
    Walls: THREE.Mesh;
  };
  materials: {};
};

export function Walls(props: JSX.IntrinsicElements["group"]) {
  const { nodes, materials } = useGLTF("/walls.glb") as GLTFResult;
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Walls.geometry}
        material={nodes.Walls.material}
      />
    </group>
  );
}

useGLTF.preload("/walls.glb");
