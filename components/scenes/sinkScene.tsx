'use client'
// https://github.com/jdeboi/lmd/blob/master/client/src/components/sketches/HardDrives/HardDrives.js
import React, { useRef, useMemo, useState, useEffect, Suspense } from 'react';
import { Canvas, useLoader, useFrame } from '@react-three/fiber';
import { TextureLoader, Vector3, Mesh, MeshBasicMaterial } from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OBJLoader } from 'three/addons/loaders/OBJLoader.js';
import { MTLLoader } from 'three/addons/loaders/MTLLoader.js';


import { Stats, OrbitControls } from '@react-three/drei'
import Ocean from '../features/ocean';
import Modal from '../features/modal';

interface ObjProps {
    position: Vector3;
}



const ModelsContainer: React.FC<{ count: number }> = ({ count }) => {
    const bottlePositions = useMemo(() => {
        const positions: Vector3[] = [];
        for (let i = 0; i < count; i++) {
            const spread = 50;
            const x = Math.random() * spread - spread/2;
            const z = Math.random() * spread - spread/2;
            positions.push(new Vector3(x, 0, z));
        }
        return positions;
    }, [count]);

    return (
        <>
            {bottlePositions.map((position: Vector3, index: number) => (
                <BottleModel i={index} key={index} position={position} />
            ))}
        </>
    );
};


interface BottleModelProps {
    position: Vector3;
    i: Number;
}

const BottleModel: React.FC<BottleModelProps> = ({ position, i }) => {
    const obj = useLoader(OBJLoader, '/Corona/Corona.obj');
    const material = new MeshBasicMaterial({ color: 0x00000f, opacity: 0.8, transparent: true }); // Semi-transparent material
    // Ensure that the object is loaded before rendering
    // if (!obj) return null;

    // Apply material to each child of the loaded object
    obj.traverse(child => {
        if (child instanceof Mesh) {
            child.material = material;
        }
    });
    const modelRef = useRef<THREE.Group>();
    const scale = .2;
    obj.scale.set(scale, scale, scale);
    obj.rotation.set(0, Math.random() * Math.PI*2, 0);
    obj.position.set(position.x, position.y, position.z);
   
    useFrame(() => {
        if (modelRef.current) {
            // Perform any animations or updates here if needed
            const currentX = modelRef.current.position.x;
           
            modelRef.current.position.y = .5 * Math.sin(new Date().getTime() / 600 + currentX / 60) - 3;
        }
    });

    return (
        <primitive
            ref={modelRef}
            object={obj.clone()}
        />
    );
};


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

    return (
        <>
            <Canvas>
                <mesh>
                    <sphereGeometry args={[500, 60, 40]} />
                    <Suspense fallback={null}>
                        <SphereMaterial />
                    </Suspense>
                </mesh>

                <Suspense fallback={null}>
                    {/* <Bottle /> */}
                    {/* <OBJLoaderComponent position={bottlePosition} /> */}
                    <ModelsContainer count={15} />
                    {/* <OBJBottle position={new Vector3(0, -5, 0)} /> */}
                    {/* <BottleModel
                        position={new Vector3(0, -3, -3)}
                    /> */}
                </Suspense>

                <Ocean position={[0, -3, 0]} />
                <OrbitControls enableZoom={false} enablePan={false} />

            </Canvas>
            <Modal title="SOS" txt="" onSubmit={() => console.log("submitted")} />
        </ >
    );
};

export default Sink;