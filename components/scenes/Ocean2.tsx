import React, { useRef, useEffect } from "react";
import * as THREE from "three";
import { Water } from "three/examples/jsm/objects/Water2.js";

const Ocean2: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Set up Three.js scene
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    containerRef.current.appendChild(renderer.domElement);

    // Set up Water2
    const waterGeometry = new THREE.PlaneGeometry(100, 100, 10, 10);
    const water = new Water(
      waterGeometry,
      {
        textureWidth: 512,
        textureHeight: 512,
      
      }
    );
    water.rotation.x = - Math.PI / 2;
    scene.add(water);

    // Set up lights
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
    scene.add(directionalLight);

    // Set up camera position
    camera.position.set(0, 10, 10);

    // Render loop
    const animate = function () {
      requestAnimationFrame(animate);
      // water.material.uniforms["time"].value += 1.0 / 60.0;
      renderer.render(scene, camera);
    };
    animate();

    // Cleanup
    return () => {
      // Dispose Three.js objects to prevent memory leaks
      waterGeometry.dispose();
      water.material.dispose();
      renderer.dispose();
    };
  }, []);

  return <div ref={containerRef} />;
};

export default Ocean2;