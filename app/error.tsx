"use client";

import React from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6">
      <h2 className="text-3xl font-bold mb-4">Something went wrong!</h2>
      <p className="mb-4 text-center">{error.message}</p>
      <button
        onClick={reset}
        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded"
      >
        Try again
      </button>
    </div>
  );
}
