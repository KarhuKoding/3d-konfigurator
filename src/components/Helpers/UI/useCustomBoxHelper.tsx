import { useFrame, useThree } from "@react-three/fiber";
import React from "react";
import { BoxHelper, Object3D } from "three";

type Helper = Object3D & { update: () => void; dispose: () => void };

//https://github.com/pmndrs/drei/blob/master/src/core/useHelper.tsx
//https://github.com/mrdoob/three.js/blob/dev/src/helpers/BoxHelper.js

export const useCustomBoxHelper = (ref: any) => {
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
