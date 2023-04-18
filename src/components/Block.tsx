import { animated, useSpring } from "@react-spring/three";
import { useGLTF } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { useDrag } from "@use-gesture/react";
import React, { useRef, useState } from "react";
import * as THREE from "three";
import { GLTF } from "three-stdlib";
import { useSnapshot } from "valtio";
import { state } from "../store/store";
import { eMode } from "../types";
<<<<<<< HEAD
import { Edges } from "@react-three/drei";
import { useGLTF, useHelper } from "@react-three/drei";
import { GLTF } from "three-stdlib";
import { BoxHelper, Object3D } from "three";
import { useThree } from "@react-three/fiber";
import * as THREE from "three";
import { Falsey } from "utility-types";
import { Demo } from "./Helpers/UI/HTMLAnnotation";
=======
>>>>>>> updateForModelMovement

interface Props {
  position: [x: number, y: number, z: number];
  rotation: [x: number, y: number, z: number];
  color: string;
  clickedBlock: Function;
  blockId: number;
  geometry: any;
  setIsDragging: any;
  floorPlane: any;
}
type Ref = any;

type GLTFResult = GLTF & {
  nodes: {
    Office_Desk005: THREE.Mesh;
  };
  materials: {
    OfficeTable: THREE.MeshStandardMaterial;
  };
};

export const Block = React.forwardRef<Ref, Props>(
  (
    //@ts-ignore
    {
      position,
      rotation,
      color = "blue",
      clickedBlock,
      blockId,
      geometry,
      setIsDragging,
      floorPlane,
    },
    ref
  ) => {
    const table = useGLTF("/table.gltf") as GLTFResult;
    const scene = useThree((state) => state.scene);
    // TODO sync with gloabl state
    const [annotationVisible, setAnnotation] = useState(false);

    const [x, y, z] = position;
    const [rx, ry, rz] = rotation;
    const [hovered, setHover] = useState<null | Boolean>(null);
    const snap = useSnapshot(state);

    const handeClick = () => {
<<<<<<< HEAD
      console.log("click");
      if (snap.mode === eMode.PICK) {
        state.mode = eMode.IDLE;
      }
=======
      // if (snap.mode === eMode.PICK) {
      //   state.mode = eMode.IDLE;
      // }
      // clickedBlock(blockId);
    };

    const handlePointerUp = () => {
>>>>>>> updateForModelMovement
      if (snap.mode === eMode.IDLE) {
        setAnnotation(true);
        // Set State to PICK
        state.mode = eMode.PICK;
        // clickedBlock(blockId);
      }
    };

    const handlePointerDown = () => {};

    // useEffect(() => {
    //   //@ts-ignore
    //   console.log(ref.current.children[0].geometry.uuid);
    // }, []);

    const getColor = () => {
      // Only Hightlight Item when not Selected or in Draw Mode
      if (snap.mode === eMode.IDLE) {
        const yellow = "yellow";

        if (hovered) {
          return yellow;
        } else {
          return color;
        }
      }
    };

<<<<<<< HEAD
=======
    const [pos, setPos] = useState([...position]);
    const { size, viewport } = useThree();
    const aspect = size.width / viewport.width;

    let planeIntersectPoint = new THREE.Vector3();

    const dragObjectRef = ref;

    const [spring, api] = useSpring(() => ({
      // position: [0, 0, 0],
      position: pos,
      scale: 1,
      rotation: [0, 0, 0],
      // config: { friction: 100 },
    }));

    const bind = useDrag(
      ({ active, movement: [x, y], timeStamp, event }) => {
        if (active) {
          // console.log(floorPlane);
          //@ts-ignore
          event.ray.intersectPlane(floorPlane, planeIntersectPoint);

          const position = new THREE.Vector3(
            //@ts-ignore
            planeIntersectPoint.x.toFixed(2) * 1,
            0,
            //@ts-ignore
            planeIntersectPoint.z.toFixed(2) * 1
          );

          setPos([position.x, 0, position.z]);
        }

        setIsDragging(active);

        api.start({
          // position: active ? [x / aspect, -y / aspect, 0] : [0, 0, 0],
          position: pos,
          scale: active ? 1.1 : 1,
        });
        return timeStamp;
      },
      { delay: true }
    );

>>>>>>> updateForModelMovement
    return (
      <>
        {/* <group
          position={[x, y, z]}
          rotation={[rx, ry, rz]}
          ref={ref}
          onPointerOver={() => setHover(true)}
          onPointerOut={() => setHover(false)}
            onClick={handeClick}
           onPointerDown={handlePointerUp}
          onPointerUp={handlePointerDown}
        > */}
        {/* @ts-ignore */}
        <animated.mesh {...spring} {...bind()}>
          {geometry}
<<<<<<< HEAD
          <Demo open={annotationVisible} setOpened={setAnnotation} />
        </group>
=======
        </animated.mesh>
        {/* </group> */}
>>>>>>> updateForModelMovement
      </>
    );
  }
);
