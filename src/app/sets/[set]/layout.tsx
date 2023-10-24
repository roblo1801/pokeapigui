import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "PokeApi Explorer",
  description: "PokeApi Explorer built with Next.js",
};

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
