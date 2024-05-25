"use client";
import React from "react";
import Script from "next/script";
import "@/../public/style/mc.css";

export function MagicCircleComponent() {
  return (
    <>
      <div>
        <style jsx>
          {`
            body {
              margin: 0;
            }

            #wrapper {
              height: 90vh;
            }
          `}
        </style>
        <div id="wrapper"></div>
        <Script
          type="text/javascript"
          src="/js/magic-circle.js"
          onLoad={() => {
            //@ts-ignore
            new MagicCircle("wrapper", {
              paletteVariants: true,
              colorPattern: "segmentLength",
              colorPalette: "dyadic_1",
              controls: true,
              axis: { label: { color: "#b8d0b2" } },
            });

            // Since 'DOMContentLoaded' fires before css styles are fully loaded/applied,
            // we trigger several 'resize' events to ensure the layout is built according
            // to those styles.
            const trigger = () => window.dispatchEvent(new Event("resize"));
            [1, 2, 3, 4, 5, 6].forEach((n) => setTimeout(trigger, n * 50));
          }}
        ></Script>
      </div>
    </>
  );
}
