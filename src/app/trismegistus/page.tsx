import React from "react";
import Script from "next/script";

export default function Trismagistus() {
  return (
    <div>
      <div className="header mt-[10px]">
        Recursion Level <span id="levelCounter">1</span>
      </div>
      <div className="controlPanel space-x-4">
        <button type="button" className="button " id="toggleRot_button">
          Toggle Rotation
        </button>
        <button type="button" className="button" id="incLev_button">
          Increase Level
        </button>
        <button type="button" className="button" id="decLev_button">
          Decrease Level
        </button>
      </div>
      <canvas id="canvas"></canvas>
      <Script type="module" src="/js/app.js"></Script>
    </div>
  );
}
