"use client";

import React from "react";
import Card from "antd/es/card/Card";
import Link from "next/link";

export default function Endpoint({ endpoint }: { endpoint: string }) {
  return (
    <Link href={`/${endpoint.toLowerCase()}`}>
      <Card title={endpoint}>
        <p>Card Content</p>
      </Card>
    </Link>
  );
}
