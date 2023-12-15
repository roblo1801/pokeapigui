"use client";

import { PokemonMove } from "@/types/PokemonType";
import { capitalize } from "@/utils/functions/capitalize";
import { Table } from "@mantine/core";
import React from "react";

type Props = {
  moves: PokemonMove[];
};

function LearnedMoves({ moves }: Props) {
  return (
    <Table>
      <Table.Thead>
        <Table.Tr>
          <Table.Th>Name</Table.Th>
          <Table.Th>Level Learnt</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>
        {moves.map((move) => (
          <Table.Tr key={move.move.name}>
            <Table.Td>
              {move.move.name
                .split("-")
                .map((e) => capitalize(e))
                .join(" ")}
            </Table.Td>
            <Table.Td>
              {move.version_group_details[0].level_learned_at}
            </Table.Td>
          </Table.Tr>
        ))}
      </Table.Tbody>
    </Table>
  );
}

export default LearnedMoves;
