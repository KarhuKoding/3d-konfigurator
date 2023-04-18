import { Box } from "@mantine/core";
import { useGLTF, useHelper } from "@react-three/drei";
import { useThree, useFrame } from "@react-three/fiber";
import { BoxHelper, Object3D } from "three";
import { GLTF } from "three-stdlib";
import React, { useEffect, useRef } from "react";

type Helper = Object3D & { update: () => void; dispose: () => void };

const useCustomBoxHelper = (ref: any) => {
  const boxHelper = React.useRef<Helper>();
  const scene = useThree((state: any) => state.scene);

  React.useLayoutEffect(() => {
    let currentHelper: any = undefined!;

    if (ref && ref?.current) {
      boxHelper.current = currentHelper = new BoxHelper(ref.current, "lime");
    }
    if (currentHelper) {
      scene.add(currentHelper);
      return () => {
        boxHelper.current = undefined;
        scene.remove(currentHelper);
        currentHelper.dispose?.();
      };
    }
  }, [scene, ref]);

  useFrame(() => void boxHelper.current?.update?.());
  return boxHelper;
};

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

  //@ts-ignore
  // useHelper(ref, BoxHelper, "green");

  return (
    <group {...props} dispose={null}>
      <mesh
        ref={ref}
        castShadow
        geometry={nodes.Chair001.geometry}
        material={materials.Chair01}
        position={[0, 0, 0]}    
      />
    </group>
  );
}

useGLTF.preload("/chairGLTF.gltf");
