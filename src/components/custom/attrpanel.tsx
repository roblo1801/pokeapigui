import React from "react";
import Panel from "antd/es/collapse/CollapsePanel";

function AbilitiesPanel({ children }: { children: React.ReactNode }) {
  return (
    <Panel key={"Abilities"} header={"Abilities"}>
      {children}
    </Panel>
  );
}

export default AbilitiesPanel;
