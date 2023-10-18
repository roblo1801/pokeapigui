import React from "react";

function AbilitiesPanel({ children }: { children: React.ReactNode }) {
  return (
    // <Panel key={"Abilities"} header={"Abilities"}>
    //   {children}
    // </Panel>
    <>{children}</>
  );
}

export default AbilitiesPanel;
