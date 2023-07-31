"use client";

import React from "react";
import Card from "antd/es/card/Card";
import Link from "next/link";

export default function Endpoint({
  endpoint,
}: {
  endpoint: {
    name: string;
    url: string;
    content: string;
  };
}) {
  return (
    <Link href={`/${endpoint.name.toLowerCase()}`}>
      <Card title={endpoint.name}>
        <p>{endpoint.content}</p>
      </Card>
    </Link>
  );
}
