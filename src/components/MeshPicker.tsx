import React, { useState } from "react";

const MeshPickerState = () => {
  const [picker, setPicker] = useState("box");
  return { picker, setPicker };
};

const MeshPicker = () => {
  const { picker, setPicker } = MeshPickerState();

  const handleClick = (el: string) => {
    setPicker(el);
  };
  return (
    <ul>
      <li
        onClick={() => handleClick("box")}
        className={picker === "box" ? "selected" : ""}
      >
        Box
      </li>
      <li
        onClick={() => handleClick("boxlarge")}
        className={picker === "boxlarge" ? "selected" : ""}
      >
        Big Box
      </li>
    </ul>
  );
};

export default MeshPicker;
