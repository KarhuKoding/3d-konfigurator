import React, { useState } from "react";

export const MeshPicker = (props: { setPicker: any; picker: string }) => {
  const handleClick = (el: string) => {
    props.setPicker(el);
  };
  return (
    <ul>
      <li
        onClick={() => handleClick("box")}
        className={props.picker === "box" ? "selected" : ""}
      >
        Box
      </li>
      <li
        onClick={() => handleClick("boxlarge")}
        className={props.picker === "boxlarge" ? "selected" : ""}
      >
        Big Box
      </li>
    </ul>
  );
};
