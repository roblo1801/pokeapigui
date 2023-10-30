"use client";
import React from "react";
import { Accordion } from "@mantine/core";
import classes from "./attributes.module.css";

function Attributes({
  items,
}: {
  items: {
    key: string;
    label: string;
    extra: React.ReactNode;
    children: React.ReactNode;
  }[];
}) {
  return (
    <Accordion variant="filled">
      {items.map((item) => (
        <Accordion.Item
          className={classes.root}
          key={item.key}
          value={item.key}
        >
          <Accordion.Control icon={item.extra}>{item.key}</Accordion.Control>
          <Accordion.Panel>{item.children}</Accordion.Panel>
        </Accordion.Item>
      ))}
    </Accordion>
  );
}

export default Attributes;
