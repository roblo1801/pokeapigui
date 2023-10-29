"use client";

import React from "react";
import Link from "next/link";
import { Card, Text } from "@mantine/core";
import Image from "next/image";

export default function Collection({
  endpoint,
}: {
  endpoint: {
    name: string;
    url: string;
    link: string;
  };
}) {
  return (
    <Link href={`/${endpoint.link}`}>
      <Card shadow="lg" padding="lg" radius="md" bg="dark" withBorder>
        <Card.Section withBorder mah={150} style={{ overflow: "hidden" }}>
          <Image
            src={endpoint.url}
            alt={endpoint.name}
            width={150}
            height={150}
            priority={true}
          />
        </Card.Section>
        <Text
          variant="gradient"
          ta="center"
          tt="uppercase"
          gradient={{ from: "white", to: "gold" }}
          className="flex self-center justify-center align-middle items-center"
        >
          {endpoint.name}
        </Text>
      </Card>
    </Link>
  );
}
