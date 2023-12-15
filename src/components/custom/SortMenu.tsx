"use client";

import { Menu, Button, Text, rem } from "@mantine/core";
import {
  IconSettings,
  IconSearch,
  IconPhoto,
  IconMessageCircle,
  IconTrash,
  IconArrowsLeftRight,
} from "@tabler/icons-react";

type Props = {
  setSortStat: (sort: string) => void;
  children: React.ReactNode;
};

export default function SortMenu({ setSortStat, children }: Props) {
  return (
    <Menu shadow="md" width={200}>
      <Menu.Target>{children}</Menu.Target>
      <Menu.Dropdown>
        <Menu.Label>Stats</Menu.Label>
        <Menu.Item onClick={() => setSortStat("hp")}>HP</Menu.Item>
        <Menu.Item onClick={() => setSortStat("attack")}>Attack</Menu.Item>
        <Menu.Item onClick={() => setSortStat("defense")}>Defense</Menu.Item>
        <Menu.Item onClick={() => setSortStat("special-attack")}>
          Special Attack
        </Menu.Item>
        <Menu.Item onClick={() => setSortStat("special-defense")}>
          Special Defense
        </Menu.Item>
        <Menu.Item onClick={() => setSortStat("speed")}>Speed</Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}
