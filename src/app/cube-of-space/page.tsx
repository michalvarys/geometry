// import { Animation } from "@/components/Animation";
import dynamic from "next/dynamic";
import React from "react";

const Animation = dynamic(() => import("@/components/Animation"), {
  ssr: false,
});

export default function App() {
  return (
    <div>
      <Animation />
    </div>
  );
}
