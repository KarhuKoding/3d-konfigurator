import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { GLTF } from "three-stdlib";

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
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Chair001.geometry}
        material={materials.Chair01}
        position={[1.28, 0.03, 0.7]}
        rotation={[0, -1.15, 0]}
      />
    </group>
  );
}

useGLTF.preload("/chairGLTF.gltf");
