"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

/** Preserve previously shared section URLs after the move to actual pages. */
export function HashTarget() {
  const router = useRouter();
  useEffect(() => {
    const destinations: Record<string, string> = {
      "#approach": "/approach",
      "#systems": "/systems",
      "#experience": "/profile",
      "#profile": "/profile",
      "#contact": "/contact",
    };
    const follow = () => {
      const to = destinations[window.location.hash];
      if (to) router.replace(to);
    };
    follow();
    window.addEventListener("hashchange", follow);
    return () => window.removeEventListener("hashchange", follow);
  }, [router]);
  return null;
}
