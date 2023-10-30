import { Badge } from "@mantine/core";
import React from "react";

type Props = {
  children: React.ReactNode;
  radius: string;
};

function Badged({ children, radius }: Props) {
  return <Badge radius={radius}>{children}</Badge>;
}

export default Badged;
