import { Popover, Text, Button } from "@mantine/core";
import {
  useGLTF,
  PresentationControls,
  Environment,
  ContactShadows,
  Html,
} from "@react-three/drei";

export function Demo(props: { open: boolean; setOpened: any }) {
  return (
    <Html
      scale={1}
      rotation={[0, 0, 0]}
      position={[0, 0, 0]}
      //  transform
      // occlude
    >
      <Popover
        width={200}
        position="bottom"
        withArrow
        opened={props.open}
        onChange={props.setOpened}
      >
        <Popover.Target>
          {/* <Button>Toggle popover</Button> */}
          <div></div>
        </Popover.Target>
        <Popover.Dropdown>
          <Text size="sm">
            This is uncontrolled popover, it is opened when button is clicked
          </Text>
        </Popover.Dropdown>
      </Popover>
    </Html>
  );
}
