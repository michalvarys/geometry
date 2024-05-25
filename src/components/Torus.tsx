"use client";
import React, { useRef } from "react";
import { Canvas, MeshProps } from "@react-three/fiber";
import { Bvh, OrbitControls, useHelper } from "@react-three/drei";
import { MeshBVHHelper } from "three-mesh-bvh";
import { Perf } from "r3f-perf";
import { useControls } from "leva";
import { Mesh } from "three";

function Torus(props: MeshProps) {
  const mesh = useRef<Mesh>(null!);
  const sphere = useRef<Mesh>(null!);
  useHelper(mesh, MeshBVHHelper);
  //   useFrame(
  //     (state, delta) =>
  //       (mesh.current.rotation.x = mesh.current.rotation.y += delta)
  //   );
  return (
    <mesh
      ref={mesh}
      {...props}
      onPointerMove={(e) =>
        sphere.current.position.copy(mesh.current.worldToLocal(e.point))
      }
      onPointerOver={() => (sphere.current.visible = true)}
      onPointerOut={() => (sphere.current.visible = false)}
    >
      <torusKnotGeometry args={[1, 0.48, 200, 50]} />
      <meshNormalMaterial />
      <mesh raycast={() => null} ref={sphere} visible={false}>
        <sphereGeometry args={[0.2]} />
        <meshBasicMaterial color="orange" toneMapped={false} />
      </mesh>
    </mesh>
  );
}

export function TorusCanvas() {
  const { enabled } = useControls({ enabled: true });
  return (
    <Canvas style={{ width: "100%", height: "100vh" }} camera-far={100}>
      <color attach="background" args={["#202025"]} />
      <Perf position="bottom-right" style={{ margin: 10 }} />
      {/** Anything that Bvh wraps is getting three-mesh-bvh's acceleratedRaycast.
           Click on "enabled" to see what normal raycast performance in threejs looks like. */}
      <Bvh firstHitOnly enabled={enabled}>
        <Torus />
      </Bvh>
      <OrbitControls />
    </Canvas>
  );
}
