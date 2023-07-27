"use client";

import InfinitePokemon from "@/components/custom/inifinitepokemon";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import React, { useState } from "react";

const client = new QueryClient();

function TestingPage() {
  const [client] = useState(new QueryClient());

  return (
    <QueryClientProvider client={client}>
      <h1 style={{ textAlign: "center", fontSize: "2rem" }}>Pokemon</h1>
      <InfinitePokemon />
    </QueryClientProvider>
  );
}

export default TestingPage;
