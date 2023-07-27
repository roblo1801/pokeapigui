"use client";
import React from "react";

import Collapse, { CollapseProps } from "antd/es/collapse/Collapse";
import { IconChevronCompactDown } from "@tabler/icons-react";
import AbilitiesPanel from "./attrpanel";

function Attributes({ items }: { items: CollapseProps["items"] }) {
  return (
    <Collapse
      destroyInactivePanel={true}
      ghost
      expandIcon={() => <IconChevronCompactDown />}
      expandIconPosition="start"
      accordion
      items={items}
    >
      {/* <AbilitiesPanel>{abilities}</AbilitiesPanel> */}
    </Collapse>
  );
}

export default Attributes;
