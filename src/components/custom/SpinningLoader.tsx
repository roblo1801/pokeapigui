import { IconLoader } from "@tabler/icons-react";
import React from "react";

type Props = {};

function SpinningLoader({}: Props) {
  return (
    <div className="flex justify-center items-center p-20">
      <IconLoader className="animate-spin" size={60} />
    </div>
  );
}

export default SpinningLoader;
