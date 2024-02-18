
'use client'

import React, { useState, useEffect, Suspense } from 'react';
import { Canvas, useLoader } from '@react-three/fiber';
import { TextureLoader } from 'three';

import { Stats, OrbitControls } from '@react-three/drei'
import Ocean from '../features/Ocean';


function SphereMaterial() {
    const texture = useLoader(TextureLoader, '/pano_fq2.jpg');
    return (
        <meshBasicMaterial
            side={2} // This ensures the material is rendered on the inside of the sphere
            map={texture}
        />
    )
}

const Sink: React.FC = () => {

    // const texture = useLoader(TextureLoader, '/pano_fq2.jpg');
    return (
        <>
            <div>sink2</div>
            <Canvas>

                <mesh>

                    <sphereGeometry args={[500, 60, 40]} />
                    <Suspense fallback={null}>
                        <SphereMaterial />
                    </Suspense>
                </mesh>

                <Ocean position={[0, -5, 0]} />
                {/* <mesh rotation-x={-Math.PI / 2} position={[0, -5, 0]}>
                    <planeGeometry args={[1000, 1000]} />
                    <meshBasicMaterial color={0x122990} transparent opacity={0.7} />
                </mesh> */}
                <OrbitControls enableZoom={false} enablePan={false} />
                {/* <Stats /> */}
            </Canvas>
        </ >
    );
};

export default Sink;