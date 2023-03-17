import * as THREE from "three";
import React, { useRef } from "react";
import { useGLTF, useTexture } from "@react-three/drei";
import { GLTF } from "three-stdlib";

type GLTFResult = GLTF & {
  nodes: {
    Walls: THREE.Mesh;
  };
  materials: {};
};

export function Walls(props: JSX.IntrinsicElements["group"]) {
  const { nodes, materials } = useGLTF("/walls.glb") as GLTFResult;
  const bakedTexture = useTexture("/wood-texture-wall.jpg");

  return (
    <group {...props} dispose={null}>
      <mesh castShadow receiveShadow geometry={nodes.Walls.geometry}>
        <meshBasicMaterial map={bakedTexture} map-flipY={false} />
      </mesh>
    </group>
  );
}

useGLTF.preload("/walls.glb");
