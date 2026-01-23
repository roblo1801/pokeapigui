import React from "react";
import Link from "next/link";
import Image from "next/image";

export default function Endpoint({
  endpoint,
}: {
  endpoint: {
    name: string;
    url: string;
    content: string;
    link: string;
  };
}) {
  return (
    <Link href={`/${endpoint.link}`}>
      <div className="flex justify-center flex-col items-center bg-black rounded-xl shadow-lg p-4">
        <div className="max-h-[125px] p-1 overflow-hidden">
          <Image
            src={endpoint.url}
            alt={endpoint.name}
            width={150}
            height={150}
            priority={true}
          />
        </div>
        <h1 className="text-xl border-t border-yellow-500 w-full text-white font-bold">
          {endpoint.name}
        </h1>
      </div>
    </Link>
  );
}
