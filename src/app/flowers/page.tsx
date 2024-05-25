"use client";
import React from "react";
import Script from "next/script";
import "@/../public/style/flowers.css";
import Head from "next/head";

export default function MagicCirclePage() {
  return (
    <div>
      {/* <Script src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/836/three.min.js"></Script>
      <Script src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/836/OrbitControls.js"></Script>
      <Script src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/836/THREE.MeshLine.js"></Script>
      <Script src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/836/simplex-noise.min.js"></Script>
      <Script src="https://codepen.io/jackrugile/pen/f7248f1855b6b3ac41fc1799b440fdce.js"></Script>
      <Script src="https://codepen.io/jackrugile/pen/c8336958038e483bf27ce9347d5112a2.js"></Script> */}
      <Script src="/js/flowers.js"></Script>
    </div>
  );
}
