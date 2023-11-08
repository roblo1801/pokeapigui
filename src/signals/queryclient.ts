import { QueryClient } from "@tanstack/react-query";
import { signal } from "@preact/signals-core";

//  export const queryClient = new QueryClient();

 export const client = signal(new QueryClient());
