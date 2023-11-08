"use client";

import { client } from "@/signals/queryclient";
import { QueryClientProvider } from "@tanstack/react-query";
import dynamic from "next/dynamic";

const DynamicInfinitePokemon = dynamic(
  () => import("@/components/custom/inifinitepokemon"),
  {
    ssr: false,
  }
);

function TestingPage() {
  return (
    <QueryClientProvider client={client.value}>
      <h1 className="pokefont text-center">Pokemon</h1>
      <DynamicInfinitePokemon />
    </QueryClientProvider>
  );
}

export default TestingPage;
