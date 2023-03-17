import * as THREE from "three";
import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { GLTF } from "three-stdlib";

type GLTFResult = GLTF & {
  nodes: {
    Office_Desk005: THREE.Mesh;
  };
  materials: {
    OfficeTable: THREE.MeshStandardMaterial;
  };
};

export function Table(props: JSX.IntrinsicElements["group"]) {
  const { nodes, materials } = useGLTF("/table.gltf") as GLTFResult;
  return (
    <mesh
      castShadow
      geometry={nodes.Office_Desk005.geometry}
      material={materials.OfficeTable}
    />
  );
}

useGLTF.preload("/table.gltf");
