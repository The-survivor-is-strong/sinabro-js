import { useState } from "react";

const foo = () => {
  const [state, setState] = useState("");

  return <div>{state}</div>;
};
