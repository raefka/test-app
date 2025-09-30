"use client";

import { useRouter, useSearchParams } from "next/navigation";

export function useUpdateSearchParams() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const updateSearchParams = (updates: Record<string, string | number | null>) => {
    const params = new URLSearchParams(searchParams.toString());

    Object.entries(updates).forEach(([key, value]) => {
      if (value === null || value === "") {
        params.delete(key); 
      } else {
        params.set(key, String(value));
      }
    });

    router.push("?" + params.toString());
  };

  return { updateSearchParams, searchParams };
}