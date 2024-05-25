"use client";
import React, { useRef, useState } from "react";
import { Canvas, useFrame, useLoader, useThree } from "@react-three/fiber";

import { OrbitControls, Line, Text } from "@react-three/drei";
import * as THREE from "three";

const SIZE = 20;
const LINE_POSITION = SIZE / 2;
const LINE_WIDTH = 10;

const CARD_RATIO = 0.00125;
const CARD_POSITION = SIZE / 2 + 0.1;
const LETTER_POSITION = SIZE / 4;

const TransparentCube = () => {
  return (
    <mesh>
      <boxGeometry attach="geometry" args={[SIZE, SIZE, SIZE]} />
      <meshBasicMaterial
        attach="material"
        color="transparent"
        transparent
        opacity={0.1}
      />
    </mesh>
  );
};

// Custom hook to load textures and their dimensions
const useTextures = (urls: string[]) => {
  const textures = useLoader(THREE.TextureLoader, urls);
  const sizes = textures.map((texture) => {
    const { image } = texture;
    return { width: image.width, height: image.height };
  });
  return { textures, sizes };
};

function Camera() {
  const { camera } = useThree();
  useFrame(() => {
    const cameraDir = new THREE.Vector3();
    camera.getWorldDirection(cameraDir);
    cameraDir.negate();

    const quaternion = new THREE.Quaternion().setFromUnitVectors(
      new THREE.Vector3(0, 0, -1),
      cameraDir
    );
    const euler = new THREE.Euler().setFromQuaternion(quaternion);
    euler.x = 0;
    euler.z = 0;

    cameraDir.normalize();
    euler.y += Math.PI;

    cameraDir.applyEuler(euler);
    cameraDir.multiplyScalar(2);

    cameraDir.add(camera.position);

    camera.lookAt(cameraDir);
  });

  return <></>;
}

function useCameraLookAt<T extends THREE.Mesh>() {
  const ref = useRef<T>();

  useFrame(({ camera }) => {
    if (ref.current) {
      ref.current.lookAt(camera.position);
      // ref.current.rotation.y += Math.PI;
    }
  });

  return { ref };
}

const ImagePlane = ({ position, rotation = [0, 0, 0], texture, size }) => {
  const { ref } = useCameraLookAt();

  return (
    <>
      <mesh ref={ref} position={position}>
        <planeGeometry
          attach="geometry"
          args={[size.width * CARD_RATIO, size.height * CARD_RATIO]}
        />
        <meshBasicMaterial
          attach="material"
          map={texture}
          side={THREE.DoubleSide}
        />
      </mesh>
      {/* <mesh position={position} rotation={rotation}>
        <planeGeometry
          attach="geometry"
          args={[size.width * CARD_RATIO, size.height * CARD_RATIO]}
        />
        <meshBasicMaterial
          attach="material"
          map={texture}
          side={THREE.FrontSide}
        />
      </mesh>

      <mesh position={position} rotation={rotation}>
        <planeGeometry
          attach="geometry"
          args={[size.width * CARD_RATIO, size.height * CARD_RATIO]}
        />
        <meshBasicMaterial
          attach="material"
          map={texture}
          side={THREE.BackSide}
        />
      </mesh> */}
    </>
  );
};

const Lines = () => {
  return (
    <>
      {/* Blue line from left to right */}
      <Line
        onClick={() => console.log("click")}
        points={[
          [-LINE_POSITION, 0, 0],
          [LINE_POSITION, 0, 0],
        ]}
        color="blue"
        lineWidth={LINE_WIDTH}
      />
      {/* Yellow line from top to bottom */}
      <Line
        points={[
          [0, LINE_POSITION, 0],
          [0, -LINE_POSITION, 0],
        ]}
        color="yellow"
        lineWidth={LINE_WIDTH}
      />
      {/* Red line from back to front */}
      <Line
        points={[
          [0, 0, -LINE_POSITION],
          [0, 0, LINE_POSITION],
        ]}
        color="red"
        lineWidth={LINE_WIDTH}
      />
    </>
  );
};
const Cards = () => {
  // const { textures, sizes } = useTextures([
  //   "/assets/tarot/bota/major/0. The Fool.jpg",
  //   "/assets/tarot/bota/major/1. The Magician.jpg",
  //   "/assets/tarot/bota/major/2. High Priestess.jpg",
  //   "/assets/tarot/bota/major/3. The Empress.jpg",
  //   "/assets/tarot/bota/major/4. The Emperor.jpg",
  //   "/assets/tarot/bota/major/5. Hierophant.jpg",
  //   "/assets/tarot/bota/major/6. The Lovers.jpg",
  //   "/assets/tarot/bota/major/7. The Chariot.jpg",
  //   "/assets/tarot/bota/major/8. Strength.jpg",
  //   "/assets/tarot/bota/major/9. The Hermit.jpg",
  //   "/assets/tarot/bota/major/10. Wheel of Fortune.jpg",
  //   "/assets/tarot/bota/major/11. Justice.jpg",
  //   "/assets/tarot/bota/major/12. Hanged Man.jpg",
  //   "/assets/tarot/bota/major/13. Death.jpg",
  //   "/assets/tarot/bota/major/14. Temperance.jpg",
  //   "/assets/tarot/bota/major/15. The Devil.jpg",
  //   "/assets/tarot/bota/major/16. The Tower.jpg",
  //   "/assets/tarot/bota/major/17. The Star.jpg",
  //   "/assets/tarot/bota/major/18. The Moon.jpg",
  //   "/assets/tarot/bota/major/19. The Sun.jpg",
  //   "/assets/tarot/bota/major/20. Judgement.jpg",
  //   "/assets/tarot/bota/major/21. The World.jpg",
  // ]);

  const cardData = [
    {
      src: "/assets/tarot/bota/major/0. The Fool.jpg",
      position: [CARD_POSITION / 4, CARD_POSITION / 2, 0],
    },
    {
      src: "/assets/tarot/bota/major/1. The Magician.jpg",
      position: [0, CARD_POSITION, 0],
    },
    {
      src: "/assets/tarot/bota/major/2. High Priestess.jpg",
      position: [0, -CARD_POSITION, 0],
    },
    {
      src: "/assets/tarot/bota/major/3. The Empress.jpg",
      position: [0, 0, -CARD_POSITION],
    },
    {
      src: "/assets/tarot/bota/major/4. The Emperor.jpg",
      position: [-CARD_POSITION, 0, -CARD_POSITION],
    },
    {
      src: "/assets/tarot/bota/major/5. Hierophant.jpg",
      position: [CARD_POSITION, 0, -CARD_POSITION],
    },
    {
      src: "/assets/tarot/bota/major/6. The Lovers.jpg",
      position: [0, CARD_POSITION, -CARD_POSITION],
    },
    {
      src: "/assets/tarot/bota/major/7. The Chariot.jpg",
      position: [0, -CARD_POSITION, -CARD_POSITION],
    },
    {
      src: "/assets/tarot/bota/major/8. Strength.jpg",
      position: [-CARD_POSITION, CARD_POSITION, 0],
    },
    {
      src: "/assets/tarot/bota/major/9. The Hermit.jpg",
      position: [-CARD_POSITION, -CARD_POSITION, 0],
    },
    {
      src: "/assets/tarot/bota/major/10. Wheel of Fortune.jpg",
      position: [0, 0, CARD_POSITION],
    },
    {
      src: "/assets/tarot/bota/major/11. Justice.jpg",
      position: [-CARD_POSITION, 0, CARD_POSITION],
    },
    {
      src: "/assets/tarot/bota/major/12. Hanged Man.jpg",
      position: [CARD_POSITION / 4, 0, CARD_POSITION / 2],
    },
    {
      src: "/assets/tarot/bota/major/13. Death.jpg",
      position: [CARD_POSITION, 0, CARD_POSITION],
    },
    {
      src: "/assets/tarot/bota/major/14. Temperance.jpg",
      position: [0, CARD_POSITION, CARD_POSITION],
    },
    {
      src: "/assets/tarot/bota/major/15. The Devil.jpg",
      position: [0, -CARD_POSITION, CARD_POSITION],
    },
    {
      src: "/assets/tarot/bota/major/16. The Tower.jpg",
      position: [-CARD_POSITION, 0, 0],
    },
    {
      src: "/assets/tarot/bota/major/17. The Star.jpg",
      position: [CARD_POSITION, CARD_POSITION, 0],
    },
    {
      src: "/assets/tarot/bota/major/18. The Moon.jpg",
      position: [CARD_POSITION, -CARD_POSITION, 0],
    },
    {
      src: "/assets/tarot/bota/major/19. The Sun.jpg",
      position: [CARD_POSITION, 0, 0],
    },
    {
      src: "/assets/tarot/bota/major/20. Judgement.jpg",
      position: [-CARD_POSITION / 2, 0, CARD_POSITION / 4],
    },
    { src: "/assets/tarot/bota/major/21. The World.jpg", position: [0, 0, 0] },
  ];

  const { textures, sizes } = useTextures(cardData.map((card) => card.src));

  return (
    <>
      {cardData.map((card, index) => (
        <ImagePlane
          key={index}
          position={card.position}
          texture={textures[index]}
          size={sizes[index]}
        />
      ))}
    </>
  );
};

const HebrewLetter = ({ position, text }) => {
  const { ref } = useCameraLookAt();

  return (
    <Text ref={ref} position={position} fontSize={0.5} color="white">
      {text}
    </Text>
  );
};
export default function Animation() {
  return (
    <Canvas
      camera={{ position: [0, 0, 20] }}
      style={{ height: "100vh", width: "100vw" }}
    >
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      {/* <TransparentCube /> */}
      <Lines />
      <Cards />
      {/* Up */}
      <HebrewLetter position={[0.5, LETTER_POSITION, 0.5]} text="א" />

      {/* Down */}
      {/* <HebrewLetter position={[0, -LETTER_POSITION, 0.5]} text="ת" /> */}
      {/* East */}
      {/* <HebrewLetter position={[0, 0.5, LETTER_POSITION]} text="ר" /> */}
      {/* West */}
      {/* <HebrewLetter position={[0.5, 0.5, -LETTER_POSITION]} text="כ" /> */}
      {/* South */}
      {/* <HebrewLetter position={[LETTER_POSITION, 0.5, 0]} text="ג" /> */}
      {/* North */}
      {/* <HebrewLetter position={[-LETTER_POSITION, 0.5, 0]} text="ב" /> */}

      {/* Center */}
      <HebrewLetter position={[-2, -1, 0]} text="ת" />
      <OrbitControls />
    </Canvas>
    // <Canvas>
    //   <ambientLight intensity={Math.PI / 2} />
    //   <spotLight
    //     position={[10, 10, 10]}
    //     angle={0.15}
    //     penumbra={1}
    //     decay={0}
    //     intensity={Math.PI}
    //   />
    //   <pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI} />
    //   <Box position={[-1.2, 0, 0]} />
    //   <Box position={[1.2, 0, 0]} />
    // </Canvas>
  );
}
