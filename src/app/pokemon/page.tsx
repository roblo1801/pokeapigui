"use client";

import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import dynamic from "next/dynamic";
import React, { useState } from "react";

const client = new QueryClient();

const DynamicInfinitePokemon = dynamic(
  () => import("@/components/custom/inifinitepokemon"),
  {
    ssr: false,
  }
);

function TestingPage() {
  const [client] = useState(new QueryClient());

  return (
    <QueryClientProvider client={client}>
      <h1 className="pokefont text-center">Pokemon</h1>
      <DynamicInfinitePokemon />
    </QueryClientProvider>
  );
}

export default TestingPage;
