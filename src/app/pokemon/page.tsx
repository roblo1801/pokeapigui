"use client";

import InfinitePokemon from "@/components/custom/inifinitepokemon";
import { AuroraBackgroundProvider } from "@nauverse/react-aurora-background";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import React, { useState } from "react";

const client = new QueryClient();

function TestingPage() {
  const [client] = useState(new QueryClient());

  return (
    <QueryClientProvider client={client}>
      <h1 className="pokefont text-center">Pokemon</h1>
      <InfinitePokemon />
    </QueryClientProvider>
  );
}

export default TestingPage;
