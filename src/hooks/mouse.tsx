import { useEffect, useState } from "react";

export const useMouseDown = () => {
  const [mouseDown, setMouseDown] = useState(false);
  useEffect(() => {
    const handleDocumentMouseDown = (event: MouseEvent) => {
      if (event.button !== 2) {
        setMouseDown(true);
        setTimeout(() => setMouseDown(false), 10);
      }
    };

    document.addEventListener("mousedown", handleDocumentMouseDown);

    return () => {
      document.removeEventListener("mousedown", handleDocumentMouseDown);
    };
  }, []);

  return mouseDown;
};
