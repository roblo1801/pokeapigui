"use client";

import { Flex } from "@mantine/core";
import React from "react";
import { VictoryAxis, VictoryBar, VictoryChart, VictoryLabel } from "victory";

type Props = {
  stats: {
    name: string;
    value: number;
  }[];
};

const colors = ["red", "orange", "yellow", "blue", "green", "pink"];

function Stats({ stats }: Props) {
  return (
    <Flex m="auto" p={0} h={200}>
      <VictoryChart height={200}>
        <VictoryAxis
          tickValues={stats.map((stat) => stat.value)}
          tickFormat={["HP", "ATK", "DEF", "SP. ATK", "SP. DEF", "SPEED"]}
        />
        <VictoryBar
          data={stats.map((stat) => ({
            ...stat,
            label: stat.value,
          }))}
          x="name"
          y="value"
          style={{
            data: {
              fill: ({ index }: { index: number }) => {
                const i: number = index as number;
                return colors[i];
              },
              stroke: "#000",
              strokeWidth: 2,
            },
            labels: {
              fill: "black",
            },
          }}
          labelComponent={
            <VictoryLabel verticalAnchor="middle" textAnchor="middle" />
          }
        />
      </VictoryChart>
    </Flex>
  );
}

export default Stats;
