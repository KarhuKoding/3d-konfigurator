import { Popover } from "@mantine/core";
import { Html } from "@react-three/drei";
import { FiRotateCcw, FiTrash2 } from "react-icons/fi";
import { useEffect, useState } from "react";
import "./Annotation.scss";

const ActionMenue = () => {
  return (
    <div>
      <div className="flex flex-row">
        <FiRotateCcw />
        <p>Rotate</p>
      </div>
      <div className="flex flex-row">
        <FiTrash2 />
        <p>Delete</p>
      </div>
    </div>
  );
};

export function HTMLAnnotation(props: { clicked: Boolean }) {
  // const { open, setOpened } = props;
  // console.log(props.ref);
  const [opened, setOpened] = useState(false);
  useEffect(() => {
    console.log(opened);
    // @ts-ignore
    setOpened(props.clicked);
  }, [props.clicked, opened]);

  return (
    <Html scale={1} rotation={[0, 0, 0]} position={[0, 0, 0]}>
      <Popover
        width={200}
        position="right"
        withArrow
        opened={opened}
        onChange={setOpened}
        closeOnEscape
      >
        <Popover.Target>
          <div></div>
        </Popover.Target>
        <Popover.Dropdown>
          <ActionMenue />
        </Popover.Dropdown>
      </Popover>
    </Html>
  );
}
