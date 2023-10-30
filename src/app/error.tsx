"use client"; // Error components must be Client Components

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  const router = useRouter();

  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="w-screen my-10 text-2xl flex flex-col justify-center items-center">
      <h2>Something went wrong!</h2>
      <button
        className="border-black border p-1 rounded text-white bg-red-500"
        onClick={() => router.back()}
      >
        Go Back
      </button>
    </div>
  );
}
