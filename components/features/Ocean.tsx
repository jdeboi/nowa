import React, { useRef, useMemo } from "react";
import { extend, useThree, useLoader, useFrame } from "@react-three/fiber";
import * as THREE from "three";

import { Water } from "three/examples/jsm/objects/Water.js";
// Declare a JSX namespace for custom components
declare global {
  namespace JSX {
    interface IntrinsicElements {
      water: any; // This allows JSX to recognize the 'water' component
    }
  }
}


extend({ Water });


interface OceanProps {
  position?: [number, number, number];
  sunColor?: number;
  waterColor?: number;
}

const Ocean: React.FC<OceanProps> = ({
  position = [0, 0, 0],
  sunColor = 0xeb8934,
  waterColor = 0x0064b5
}) => {
  const ref = useRef<THREE.Object3D>();
  const gl = useThree((state) => state.gl);
  const waterNormals = useLoader(
    THREE.TextureLoader, "https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/waternormals.jpg"
  );

  waterNormals.wrapS = waterNormals.wrapT = THREE.RepeatWrapping;
  const geom = useMemo(() => new THREE.PlaneGeometry(30000, 30000), []);
  const config = useMemo(
    () => ({
      textureWidth: 512,
      textureHeight: 512,
      waterNormals,
      alpha: .9,
      sunDirection: new THREE.Vector3(),
      sunColor,
      waterColor,
      distortionScale: 40,
      fog: false,
      format: THREE.RGBAFormat,
    }),
    [waterNormals, THREE.RGBAFormat]
  );

  useFrame(
    (state, delta) => {
      if (ref.current) {
        (ref.current as any).material.uniforms.time.value += delta;
      }
    }
  );


  return (
    <water
      ref={ref}
      args={[geom, config]}
      rotation-x={-Math.PI / 2}
      position={position}
    />
  );
}

export default Ocean;