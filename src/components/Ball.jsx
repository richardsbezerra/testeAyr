import React, { useRef, useMemo, useState, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { useGLTF, Float, Environment, Trail, Sparkles } from '@react-three/drei';
import * as THREE from 'three';

function Ball() {
  const meshRef = useRef();
  const { scene, materials } = useGLTF("/models/scfi_ball.glb");
  const { viewport, camera } = useThree();
  const [hovered, setHovered] = useState(false);
  
  // Clone the scene to avoid issues with multiple instances
  const clonedScene = useMemo(() => scene.clone(), [scene]);
  
  // Enhance materials with better properties
  useMemo(() => {
    if (materials) {
      Object.values(materials).forEach((material) => {
        if (material.isMeshStandardMaterial || material.isMeshPhysicalMaterial) {
          // Enhanced material properties for sci-fi look
          material.metalness = 0.9;
          material.roughness = 0.1;
          material.envMapIntensity = 2.0;
          material.clearcoat = 1.0;
          material.clearcoatRoughness = 0.1;
          
          // Dynamic emissive glow that pulses
          material.emissive = new THREE.Color(0x2266ff);
          material.emissiveIntensity = 0.2;
          
          // Add some transparency for sci-fi effect
          material.transparent = true;
          material.opacity = 0.95;
          
          material.needsUpdate = true;
        }
      });
    }
  }, [materials]);

  // Advanced animation with multiple layers
  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.elapsedTime;
      
      // Multi-axis rotation
      meshRef.current.rotation.y += 0.008;
      meshRef.current.rotation.x += 0.003;
      
      // Complex breathing/pulsing effect
      const pulse = Math.sin(time * 1.2) * 0.08 + Math.sin(time * 0.6) * 0.04;
      const baseScale = hovered ? 5.2 : 5;
      meshRef.current.scale.setScalar(baseScale + pulse);
      
      // Advanced floating with multiple sine waves
      const floatY = Math.sin(time * 0.7) * 0.15 + Math.sin(time * 1.3) * 0.05;
      const floatX = Math.cos(time * 0.5) * 0.08;
      meshRef.current.position.set(floatX, floatY, 0);
      
      // Interactive mouse tracking with smooth interpolation
      const mouseX = (state.mouse.x * viewport.width) / 12;
      const mouseY = (state.mouse.y * viewport.height) / 12;
      
      meshRef.current.rotation.z = THREE.MathUtils.lerp(
        meshRef.current.rotation.z,
        -mouseX * 0.15,
        0.06
      );
      
      // Update emissive intensity based on mouse proximity
      if (materials) {
        Object.values(materials).forEach((material) => {
          if (material.emissive) {
            const intensity = 0.2 + Math.abs(mouseX + mouseY) * 0.1;
            material.emissiveIntensity = intensity;
          }
        });
      }
      
      // Add slight camera shake when hovered
      if (hovered) {
        camera.position.x += (Math.random() - 0.5) * 0.02;
        camera.position.y += (Math.random() - 0.5) * 0.02;
      }
    }
  });

  return (
    <group>
      {/* HDR Environment for realistic reflections */}
      <Environment 
        preset="sunset" 
        background={false}
        intensity={0.8}
      />
      
      {/* Particle effects around the ball */}
      <Sparkles
        count={50}
        scale={[8, 8, 8]}
        size={2}
        speed={0.3}
        color="#4488ff"
        opacity={0.6}
      />
      
      {/* Enhanced Float with custom settings */}
      <Float
        speed={1.8}
        rotationIntensity={0.4}
        floatIntensity={0.3}
        floatingRange={[-0.1, 0.1]}
      >
        {/* Trail effect for movement */}
        <Trail
          width={0.5}
          length={8}
          color="#4488ff"
          attenuation={(t) => t * t}
        >
          <primitive
            ref={meshRef}
            object={clonedScene}
            scale={5}
            castShadow
            receiveShadow
            onPointerOver={() => setHovered(true)}
            onPointerOut={() => setHovered(false)}
          />
        </Trail>
      </Float>
      
      {/* Dynamic lighting setup */}
      <pointLight
        position={[8, 8, 8]}
        intensity={hovered ? 0.8 : 0.5}
        color="#4488ff"
        castShadow
        shadow-camera-near={0.1}
        shadow-camera-far={50}
        shadow-mapSize={[1024, 1024]}
      />
      
      <pointLight
        position={[-8, -8, -5]}
        intensity={0.4}
        color="#ff4488"
        distance={20}
      />
      
      {/* Rim light for dramatic effect */}
      <directionalLight
        position={[0, 0, -10]}
        intensity={0.3}
        color="#ffffff"
      />
      
      {/* Ambient occlusion light */}
      <ambientLight
        intensity={0.2}
        color="#8888ff"
      />
    </group>
  );
}

// Preload the model for better performance
useGLTF.preload("/models/scfi_ball.glb");

export default Ball;