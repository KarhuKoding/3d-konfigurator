import { useGLTF } from "@react-three/drei";
import { useRef } from "react";
import { GLTF } from "three-stdlib";
import { useCustomBoxHelper } from "../Helpers/UI/useCustomBoxHelper";

type GLTFResult = GLTF & {
  nodes: {
    Chair001: THREE.Mesh;
  };
  materials: {
    Chair01: THREE.MeshStandardMaterial;
  };
};

export function Chair(props: JSX.IntrinsicElements["group"]) {
  const { nodes, materials } = useGLTF("/chairGLTF.gltf") as GLTFResult;

  const ref = useRef(null);

  useCustomBoxHelper(ref);

  return (
    <mesh
      ref={ref}
      castShadow
      geometry={nodes.Chair001.geometry}
      material={materials.Chair01}
      position={[0, 0, 0]}
    />
  );
}

useGLTF.preload("/chairGLTF.gltf");
