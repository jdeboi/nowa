'use client'


import React from 'react';
import { Canvas } from '@react-three/fiber';

const Flush: React.FC = () => {
    return (
        <>
            <div>flush</div>
            <Canvas>
                <ambientLight />
                <pointLight position={[10, 10, 10]} />
                <mesh>
                    <boxGeometry args={[1, 1, 1]} />
                    <meshStandardMaterial color="blue" />
                </mesh>
            </Canvas>
        </>
    );
};

export default Flush;