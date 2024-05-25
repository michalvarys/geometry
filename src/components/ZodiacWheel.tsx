"use client";
import React, { useRef } from "react";
import { Canvas, useFrame, extend } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Group } from "three";
import { TextGeometry } from "three/addons/geometries/TextGeometry.js";
extend({ TextGeometry });
const ZodiacSign = ({ sign, position }) => {
  return (
    <mesh position={position}>
      {/* Add geometry and texture for the zodiac sign */}
      {/** @ts-ignore */}
      <textGeometry
        attach="geometry"
        args={[
          sign,
          {
            size: 80,
            color: "white",
            curveSegments: 12,
            bevelEnabled: true,
            bevelThickness: 10,
            bevelSize: 8,
            bevelOffset: 0,
            bevelSegments: 5,
          },
        ]}
      />
      <meshStandardMaterial attach="material" color="gold" />
    </mesh>
  );
};

const ZodiacWheel = () => {
  const wheelRef = useRef<Group>(null!);

  // Rotate the wheel
  useFrame(() => {
    if (wheelRef.current) {
      wheelRef.current.rotation.y += 0.001;
    }
  });

  // Positions for the zodiac signs
  const signPositions = [
    [0, 0, 5], // Aries
    [2.5, 0, 4.33], // Taurus
    [4.33, 0, 2.5], // Gemini
    [5, 0, 0], // Cancer
    [4.33, 0, -2.5], // Leo
    [2.5, 0, -4.33], // Virgo
    [0, 0, -5], // Libra
    [-2.5, 0, -4.33], // Scorpio
    [-4.33, 0, -2.5], // Sagittarius
    [-5, 0, 0], // Capricorn
    [-4.33, 0, 2.5], // Aquarius
    [-2.5, 0, 4.33], // Pisces
  ];

  // All zodiac signs
  const signs = [
    "Aries",
    "Taurus",
    "Gemini",
    "Cancer",
    "Leo",
    "Virgo",
    "Libra",
    "Scorpio",
    "Sagittarius",
    "Capricorn",
    "Aquarius",
    "Pisces",
  ];

  return (
    <group ref={wheelRef}>
      {/* Create zodiac signs */}
      {signs.map((sign, index) => (
        <ZodiacSign key={sign} sign={sign} position={signPositions[index]} />
      ))}
    </group>
  );
};

export function ZodiacWheelCanvas() {
  return (
    <Canvas style={{ height: "100vh", width: "100vw" }}>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <ZodiacWheel />
      <OrbitControls />
    </Canvas>
  );
}
